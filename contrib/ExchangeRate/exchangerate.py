import json
import os
import re
import sys
from typing import Any
import urllib.request

with open(os.path.dirname(__file__) + "/Config.json") as f:
    config: Any = json.load(f)

text: str = os.environ["POPCLIP_TEXT"]
# text: str = "EUR 12.345,67"  # Test input.
tokens: list[str] = re.split(config["action"]["regex"], text)
symbol: str = config["supported_symbols"][tokens[1]]
amount: str = tokens[2]

if re.match(r"^\d{1,3}(,\d{3})*(\.\d{2})?$", amount):
    amount = amount.replace(",", "")
elif re.match(r"^\d{1,3}(\.\d{3})*(,\d{2})?$", amount):
    amount = amount.replace(".", "").replace(",", ".")

target_symbols: list[str] = sorted(
    s
    for s in set(config["supported_symbols"].values())
    if os.environ[f"POPCLIP_OPTION_TARGET_{s}"] == "1" and s != symbol
)

if not target_symbols:
    quit(2)  # Error code 2 invokes extension preferences panel.

with urllib.request.urlopen(
    f"https://api.frankfurter.dev/v1/latest?base={symbol}&symbols="
    + ",".join(target_symbols)
) as r:
    response: Any = json.load(r)

output: str = ", ".join(
    sorted(f"{s} {float(amount) * response['rates'][s]:.2f}" for s in target_symbols)
)

sys.stdout.write(output)
