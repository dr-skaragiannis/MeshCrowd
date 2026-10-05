# MeshCrowd — IEEE Two-Column LaTeX Manuscript

`MeshCrowd_Paper.tex` is the complete, self-contained LaTeX source of the
paper **"MeshCrowd: Multi-Band Passive RF Sensing on Commodity
Smartphones"**, in IEEE two-column journal format with all seven figures
embedded.

The figures are high-resolution **modern vector renders** (2×-scaled PNGs,
1200–2400 px) in the warm Anthropic palette — soft rounded geometry, subtle
drop shadows, gradients and refined iconography — not the original SVGs. They
are referenced directly from the `.tex` through `\includegraphics`; no SVG is
used.

## Contents

```
latex/
├── MeshCrowd_Paper.tex           # main manuscript source
├── README.md                    # this file
└── figures/
    ├── fig1_method.png          # Fig. 1 — functional decomposition
    ├── fig2_arch.png            # Fig. 2 — layered architecture
    ├── fig3_sense.png           # Fig. 3 — Sense dashboard screenshot
    ├── fig4_scans.png           # Fig. 4 — Scans / scan-epoch screen
    ├── fig5_mesh.png            # Fig. 5 — Mesh screen
    ├── fig6_transit.png         # Fig. 6 — Transit / two-node counter
    └── fig7_club.png            # Fig. 7 — Club / gamification screen
```

## How to compile

The document uses the **IEEEtran** class and the **cite** package. From inside
the `latex/` directory run `pdflatex` twice (the second pass resolves the
cross-references and citations):

```sh
cd latex
pdflatex -interaction=nonstopmode MeshCrowd_Paper.tex
pdflatex -interaction=nonstopmode MeshCrowd_Paper.tex
```

The output `MeshCrowd_Paper.pdf` will be produced.

### Requirements

- A TeX distribution (TeX Live / MiKTeX / MacTeX) with the `IEEEtran` class.
  `IEEEtran` is bundled with TeX Live and MiKTeX; otherwise install it or place
  `IEEEtran.cls` in the working directory.
- Packages: `cite`, `graphicx`, `amsmath`, `amssymb`, `textcomp`, `array`,
  `booktabs`, `url`, `hyperref`.

### Notes

- References are provided inline with the `thebibliography` environment, so no
  `.bib` file or BibTeX pass is required. Numbers appear in order of first
  citation, and the `cite` package compresses consecutive citations (e.g.
  `[3]–[6]`).
- The figures are tall phone screenshots (~0.455 aspect); they are placed as
  single-column figures at `0.58\columnwidth` so they fit within a column.
  Adjust the width in each `\includegraphics` if you prefer a different size.
- The two wide diagrams (aspect ~1.88 and ~1.57) use a `figure*`
  environment at `\textwidth` so they span both columns.

### Reproducing the images

The PNGs in `figures/` are generated from modern vector sources. To
regenerate them from scratch, run from the project root:

```sh
node scripts/fig/render-modern.mjs   # renders all 7 figures/*.png
node scripts/fig/make-pdf.mjs        # builds MeshCrowd_Figures.pdf (optional)
```

and then copy the resulting `figures/*.png` into this `latex/figures/`
directory.

For a camera-ready submission, replace the placeholder author block and the
`\markboth` header with the real author names and the submission ID.
