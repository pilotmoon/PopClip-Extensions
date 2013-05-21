#!/usr/bin/perl
# Copyright (c) 2008, John Gruber, Aristotle Pagaltzis {{{
#
# Permission is hereby granted, free of charge, to any person obtaining
# a copy of this software and associated documentation files (the
# "Software"), to deal in the Software without restriction, including
# without limitation the rights to use, copy, modify, merge, publish,
# distribute, sublicense, and/or sell copies of the Software, and to
# permit persons to whom the Software is furnished to do so, subject to
# the following conditions:
#
# The above copyright notice and this permission notice shall be
# included in all copies or substantial portions of the Software.
#
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
# EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
# MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
# IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
# CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
# TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
# SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
# }}}

use strict;
use warnings;
use utf8;
use open qw( :encoding(UTF-8) :std );

my $opt_force = @ARGV && '-f' eq $ARGV[0];
shift @ARGV if $opt_force;
shift @ARGV if @ARGV && '--' eq $ARGV[0];

my @small_words = qw( (?<!q&)a an and as at(?!&t) but by en for if in of on or the to v[.]? via vs[.]? );
my $small_re = join '|', @small_words;

my $apos = qr/ (?: ['’] [[:lower:]]* )? /x;

while ( <> ) {
	s{\A\s+}{}, s{\s+\z}{};

	$_ = lc $_ if $opt_force or not /[[:lower:]]/;

	s{
		\b (_*) (?:
			( (?<=[ ][/\\]) [[:alpha:]]+ [-_[:alpha:]/\\]+ |   # file path or
			  [-_[:alpha:]]+ [@.:] [-_[:alpha:]@.:/]+ $apos )  # URL, domain, or email
			|
			( (?i: $small_re ) $apos )                         # or small word (case-insensitive)
			|
			( [[:alpha:]] [[:lower:]'’()\[\]{}]* $apos )       # or word w/o internal caps
			|
			( [[:alpha:]] [[:alpha:]'’()\[\]{}]* $apos )       # or some other word
		) (_*) \b
	}{
		$1 . (
		  defined $2 ? $2         # preserve URL, domain, or email
		: defined $3 ? "\L$3"     # lowercase small word
		: defined $4 ? "\u\L$4"   # capitalize word w/o internal caps
		: $5                      # preserve other kinds of word
		) . $6
	}exgo;


	# exceptions for small words: capitalize at start and end of title
	s{
		(  \A [[:punct:]]*         # start of title...
		|  [:.;?!][ ]+             # or of subsentence...
		|  [ ]['"“‘(\[][ ]*     )  # or of inserted subphrase...
		( $small_re ) \b           # ... followed by small word
	}{$1\u\L$2}xigo;

	s{
		\b ( $small_re )      # small word...
		(?= [[:punct:]]* \Z   # ... at the end of the title...
		|   ['"’”)\]] [ ] )   # ... or of an inserted subphrase?
	}{\u\L$1}xigo;


	print $_, "\n";
}

# vim: ts=4 sts=4 sw=4 sr fdm=marker