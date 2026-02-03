
import json

import pandas as pd

games = json.loads(open("output.json").read())

print(len(games))

df = pd.DataFrame(data=games)
print(df.head().to_markdown(index=False))

tv_providers = ["ABC", "Peacock", "ESPN", "Prime Video"]
total = 0
for tv_provider in tv_providers:
    cpy = df[df["tv_providers"].str.contains(tv_provider)].copy()
    print(f"{tv_provider}: {len(cpy)}")
    total += len(cpy)

print(f"total of these 4 providers: {total}")
