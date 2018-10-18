# Copyright 2009 Jason Stitt
# 
# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to deal
# in the Software without restriction, including without limitation the rights
# to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
# copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:
# 
# The above copyright notice and this permission notice shall be included in
# all copies or substantial portions of the Software.
# 
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
# THE SOFTWARE.

import ctypes
import threading
import re
import platform
from sink import create_sink, destroy_sink

__all__ = ['tidy_document', 'tidy_fragment', 'release_tidy_doc']

#----------------------------------------------------------------------------#
# Constants

LIB_NAMES = ['libtidy', 'libtidy.so', 'libtidy-0.99.so.0', 'cygtidy-0-99-0',
             'tidylib', 'libtidy.dylib', 'tidy']
ENOMEM = -12
RE_BODY = re.compile(r"<body>[\r\n]*(.+?)</body>", re.S)
BASE_OPTIONS = {
    "output-xhtml": 1,     # XHTML instead of HTML4
    "indent": 1,           # Pretty; not too much of a performance hit
    "tidy-mark": 0,        # No tidy meta tag in output
    "wrap": 0,             # No wrapping
    "alt-text": "",        # Help ensure validation
    "doctype": 'strict',   # Little sense in transitional for tool-generated markup...
    "force-output": 1,     # May not get what you expect but you will get something
    }
    
# Note: These are meant as sensible defaults. If you don't like these being
# applied by default, just set tidylib.BASE_OPTIONS = {} after importing.
# You can of course override any of these options when you call the
# tidy_document() or tidy_fragment() function

#----------------------------------------------------------------------------#
# Globals

tidy = None
thread_local_doc = threading.local()

# Fix for Windows b/c tidy uses stdcall on Windows
if "Windows" == platform.system():
    load_library = ctypes.windll.LoadLibrary
else:
    load_library = ctypes.cdll.LoadLibrary

for name in LIB_NAMES:
    try:
        tidy = load_library(name)
        break
    except OSError:
        pass
        
if tidy is None:
    raise OSError("Could not load libtidy using any of these names: %s" % (",".join(LIB_NAMES)))

tidy.tidyCreate.restype = ctypes.POINTER(ctypes.c_void_p) # Fix for 64-bit systems

#----------------------------------------------------------------------------#
# Functions

def tidy_document(text, options=None, keep_doc=False):
    """ Run a string with markup through HTML Tidy; return the corrected one.
    
    text (str): The markup, which may be anything from an empty string to a
    complete (X)HTML document. Unicode values are supported; they will be
    encoded as UTF-8, and HTML Tidy's output will be decoded back to a unicode
    object.
    
    options (dict): Options passed directly to HTML Tidy; see the HTML Tidy docs
    (http://tidy.sourceforge.net/docs/quickref.html) or run tidy -help-config
    from the command line.    
    
    keep_doc (boolean): If True, store 1 document object per thread and re-use
    it, for a slight performance boost especially when tidying very large numbers
    of very short documents.
    
    returns (str, str): The tidied markup [0] and warning/error messages[1].
    Warnings and errors are returned just as tidylib returns them.
    """
    global tidy, option_names
    
    # Unicode approach is to encode as string, then decode libtidy output
    use_unicode = False
    if isinstance(text, unicode):
        use_unicode = True
        text = text.encode('utf-8')
    
    # Manage thread-local storage of persistent document object
    if keep_doc:
        if not hasattr(thread_local_doc, 'doc'):
            thread_local_doc.doc = tidy.tidyCreate()
        doc = thread_local_doc.doc
    else:
        doc = tidy.tidyCreate()
    
    # This is where error messages are sent by libtidy
    sink = create_sink()
    tidy.tidySetErrorSink(doc, sink)
    
    try:
        # Set options on the document
        # If keep_doc=True, options will persist between calls, but they can
        # be overridden, and the BASE_OPTIONS will be set each time
        tidy_options = dict(BASE_OPTIONS)
        if options:
            tidy_options.update(options)
        if use_unicode:
            tidy_options['input-encoding'] = 'utf8'
            tidy_options['output-encoding'] = 'utf8'
        for key in tidy_options:
            value = tidy_options[key]
            key = key.replace('_', '-')
            if value is None:
                value = ''
            tidy.tidyOptParseValue(doc, key, str(value))
            error = str(sink)
            if error:
                raise ValueError("(tidylib) " + error)
    
        # The point of the whole thing
        tidy.tidyParseString(doc, text)
        tidy.tidyCleanAndRepair(doc)
        
        # Guess at buffer size; tidy returns ENOMEM if the buffer is too
        # small and puts the required size into out_length
        out_length = ctypes.c_int(8192)
        out = ctypes.c_buffer(out_length.value)
        if ENOMEM == tidy.tidySaveString(doc, out, ctypes.byref(out_length)):
            out = ctypes.c_buffer(out_length.value)
            tidy.tidySaveString(doc, out, ctypes.byref(out_length))
            
        document = out.value
        if use_unicode:
            document = document.decode('utf-8')
        errors = str(sink)
    finally:
        destroy_sink(sink)
        if not keep_doc:
            tidy.tidyRelease(doc)

    return (document, errors)
    
    
def tidy_fragment(text, options=None, keep_doc=False):
    """ Tidy a string with markup and return only the <body> contents.
    
    HTML Tidy normally returns a full (X)HTML document; this function returns only
    the contents of the <body> element and is meant to be used for snippets.
    Calling tidy_fragment on elements that don't go in the <body>, like <title>,
    will produce incorrect behavior.
    
    Arguments and return value are the same as tidy_document. Note that HTML
    Tidy will always complain about the lack of a doctype and <title> element
    in fragments, and these errors are not stripped out for you. """
    document, errors = tidy_document(text, options, keep_doc)
    match = RE_BODY.search(document)
    if match:
        document = match.group(1).strip()
        return (document, errors)
    else:
        raise ValueError("tidy_fragment failed to process text")
    
def release_tidy_doc():
    """ Release the stored document object in the current thread. Only useful
    if you have called tidy_document or tidy_fragament with keep_doc=True. """
    if hasattr(thread_local_doc, 'doc'):
        tidy.tidyRelease(thread_local_doc.doc)
        del thread_local_doc.doc
    
#----------------------------------------------------------------------------#
    