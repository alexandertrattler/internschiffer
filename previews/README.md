# Website preview screenshots

This folder is reserved for generated agency website previews.

Run from the project root:

```sh
node scripts/capture-previews.mjs --limit 5
```

Useful options:

```sh
node scripts/capture-previews.mjs --ids 1,2,3
node scripts/capture-previews.mjs --force
node scripts/capture-previews.mjs --width 1440 --height 1000
```

The script writes `.jpg` screenshots and a `preview-manifest.json` file into this folder. The UI is not wired to these images yet.
