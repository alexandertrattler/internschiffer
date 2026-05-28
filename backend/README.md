# internschiffer backend

Lokales Admin-Backend zum Aktualisieren der Agentur-Daten per JSON- oder XLSX-Upload.

## Start

```sh
cd "/Users/atrattler/Dropbox/_HSBI_/07_Agent/agency-landscape-web"
/Users/atrattler/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3 backend/server.py
```

Wenn das Backend laeuft, erscheint in der Website-Toolbar der Button `Upload`.

## Upload-Format

JSON kann direkt ein Array enthalten oder ein Objekt mit `agencies` / `data`.

XLSX nutzt die erste Tabelle und die erste Zeile als Header. Erkannte Spalten:

- `id`
- `name`, `Firma`, `Agentur`, `Company`
- `providedUrl`, `Eingabe`, `Original`
- `domain`, `Website`, `Webseite`
- `sourceUrl`, `Quelle`, `URL`
- `location`, `Ort`, `Stadt`, `Standort`
- `profile`, `Profil`, `Beschreibung`
- `confidence`, `Sicherheit`

Vor jedem Update werden lokale Backups in `backups/` geschrieben. Dieser Ordner wird nicht mit Git synchronisiert.
