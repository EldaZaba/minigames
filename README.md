# Mě to nebaví CZ — Online Minihry

Sbírka 20 browserových miniher v češtině, hratelných zdarma bez instalace na mobilu i počítači.

**Web:** [metonebavi.cz](https://www.metonebavi.cz/)

---

## Hry

**Akce a reflex**
- **Orbitální únik** — pohyb po orbitě, vyhýbání meteorům, nouzový pulz
- **Space Invaders** — zničte vlny mimozemšťanů dříve, než dosáhnou Země
- **Asteroidy** — otočte loď, střílejte asteroidy, přežijte vlny
- **Flappy Bird** — proleťte ptákem mezi trubkami
- **Breakout** — rozbijte cihly míčkem, 5 levelů s různými vzory
- **Whack-a-Mole** — klikejte na krtky dříve, než zmizí

**Klasiky a arkáda**
- **Had (Snake)** — sbírejte jídlo a rostěte, bonusové zlaté jídlo
- **Tetris** — skládejte padající bloky a čistěte řádky
- **Simon říká** — opakujte stále delší barevné sekvence
- **Pexeso** — hledejte páry karet, režim vs hráč i vs počítač

**Logika**
- **2048** — spojujte čísla a dosáhněte 2048
- **Sudoku** — 9×9 mřížka, 3 obtížnosti (lehká / střední / těžká)
- **Minesweeper** — odkryjte všechna bezpečná pole bez miny
- **Lights Out** — zhasněte všechna světla přepínáním políček
- **Puzzle** — skládejte obrázek z dílků

**Nástroje a zábava**
- **Kolo štěstí & Team Maker** — točící se kolo s vlastními segmenty; oddělená záložka pro náhodné rozdělení lidí do týmů (s podporou skupiny „spolu")

**Strategické a slovní**
- **Piškvorky** — vs hráč nebo vs AI (Lehký = beatable / Těžký = minimax)
- **Čtyři v řadě** — vs hráč nebo vs AI (minimax s alfa-beta pruningem, hloubka 5)
- **Šibenice** — hádejte česká slova bez háčků a čárek
- **Solitaire** — Klondike solitaire, klasická karetní hra

---

## Tech Stack

- **HTML5 / CSS3 / JavaScript** — čisté, žádný build krok ani framework
- **[Tailwind CSS](https://tailwindcss.com/)** — utility třídy (CDN)
- **[Font Awesome 6](https://fontawesome.com/)** — ikony (CDN)
- **[Google Fonts](https://fonts.google.com/)** — Fraunces + Space Grotesk

### Motivy

Soubor `assets/theme.css` definuje CSS proměnné pro 4 motivy: Sunset (výchozí), Ocean, Forest, Tmavý.  
Soubor `assets/theme.js` vloží přepínač a načte uložený motiv z `localStorage`.

---

## Struktura projektu

```
MiniGames/
├── index.html              # Landing page
├── games.html              # Přehled všech her
├── assets/
│   ├── theme.css           # Globální styly + CSS motivy
│   ├── theme.js            # Logika přepínače motivů
│   ├── favicon/            # Favikony (ico, png, webp)
│   ├── preview-window/     # Open Graph náhledový obrázek
│   └── puzzle-image1.svg   # Obrázek pro puzzle hru
└── games/
    ├── 2048.html
    ├── asteroids.html
    ├── breakout.html
    ├── connectfour.html
    ├── flappybird.html
    ├── hangman.html
    ├── lightsout.html
    ├── memory.html
    ├── minesweeper.html
    ├── orbitalescape.html
    ├── puzzle.html
    ├── simon.html
    ├── snake.html
    ├── solitaire.html
    ├── spaceinvaders.html
    ├── sudoku.html
    ├── tetris.html
    ├── tictactoe.html
    ├── whackamole.html
    └── wheeloffortune.html
```

---

## Lokální spuštění

Stačí otevřít `index.html` v prohlížeči. Pro správné načítání relativních cest lze použít jednoduchý server:

```bash
python -m http.server 8080
```

---

## Přidání nové hry

1. Vytvořte `games/<nazev>.html` — použijte libovolnou existující hru jako šablonu (doporučeno `snake.html`).
2. Přidejte kartu do `games.html` (zkopírujte existující `<a class="game-card">` blok).
3. Aktualizujte počet her v `index.html`:
   - `.home-stat strong` (číslo v statistikách)
   - Tlačítko „Zobrazit všech N her" v CTA sekci
4. Volitelně přidejte odkaz do sekce „Doporučené starty" nebo „Rychlý výběr" v `index.html`.

---

## Bezpečnostní audit

Výsledky pentestingu (statický client-side kód, žádný backend):

**Bez aktivních zranitelností**
- **XSS** — bezpečné: dynamický obsah vkládán výhradně přes `textContent`; `innerHTML` slouží jen k mazání kontejnerů nebo vkládání hardcoded Font Awesome tagů
- **eval()** — bezpečné: žádný výskyt v celém projektu
- **Open Redirect** — bezpečné: žádné přesměrování na URL odvozené od vstupu
- **localStorage** — bezpečné: ukládána pouze číselná skóre (Snake, Flappy Bird, Orbitální únik) + klíč motivu; hodnoty parsovány přes `parseInt()` nebo porovnány na whitelist
- **Prototype Pollution** — bezpečné: žádné `Object.assign` s externími daty, žádný `JSON.parse` uživatelského vstupu

**Teoretická rizika na úrovni infrastruktury (nízká priorita)**
- **CDN bez SRI** — Tailwind, Font Awesome a Google Fonts nepoužívají `integrity` hashe. Doporučení pro produkci: přidat SRI hashe nebo bundlovat zdroje lokálně.
- **Chybějící CSP** — Content Security Policy není nastavena. Doporučení: přidat přes serverovou konfiguraci (nginx/Apache `.htaccess`) nebo `<meta http-equiv="Content-Security-Policy">`.

Kód neobsahuje žádné aktivní zranitelnosti. Všechny nalezené body jsou teoretická rizika na úrovni infrastruktury, nikoliv chyby v aplikační logice.

---

## Ovládání

**Had, Tetris** — šipky / WASD na klávesnici, swipe nebo tlačítka na mobilu  
**Breakout** — šipky ← → nebo myš/tažení prstem  
**Asteroidy, Space Invaders** — šipky, mezerník; virtuální tlačítka na mobilu  
**Piškvorky, Pexeso, Čtyři v řadě** — klik / tap  
**Sudoku** — čísla 1–9, Backspace; číselník na obrazovce  
**Solitaire** — klik / tap

---

## Podpora

Pokud se ti projekt líbí, přispěj přes [Buy Me a Coffee](https://www.buymeacoffee.com/eldazaba).

---

## Licence

© 2026 Mě to nebaví CZ. Všechna práva vyhrazena.
