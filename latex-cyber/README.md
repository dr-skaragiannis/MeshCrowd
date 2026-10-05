# MeshCrowd — Trustworthy Crowd Sensing (Cybersecurity & Gamification)

`MeshCrowd_Cyber.tex` is a **new** IEEE two-column research paper that
reframes the MeshCrowd work around **cybersecurity** and **gamification**,
rather than the earlier sensing-focused manuscript (`../latex/`).

The thesis: in a device-free, crowd-sourced sensing mesh the incentive and the
security objective can be made to *coincide*. Because the gamification layer
computes an explicit estimated accuracy and grants a reliable-accuracy bonus to
the devices nearest the fused mesh mean, encouraging accuracy is equivalent to
encouraging honesty. A Byzantine node that publishes forged beacons (spoofed
SSIDs, rogue APs, phantom BLE advertising) or forged crossing reports reduces
its own reliability score, so deception becomes the losing strategy.

## Contents

```
latex-cyber/
├── MeshCrowd_Cyber.tex           # main manuscript source
├── README.md                    # this file
└── figures/
    ├── fig1_method.png          # Fig. 1 — functional decomposition
    ├── fig2_arch.png            # Fig. 2 — layered architecture
    ├── fig3_sense.png           # Fig. 3 — Sense dashboard
    ├── fig4_scans.png           # Fig. 4 — Scans / scan-epoch screen
    ├── fig5_mesh.png            # Fig. 5 — Mesh screen
    ├── fig6_transit.png         # Fig. 6 — Transit / two-node counter
    └── fig7_club.png            # Fig. 7 — Club / gamification screen
```

## How to compile

Run `pdflatex` twice (the second pass resolves `\ref` cross-references and the
`\cite` ranges):

```sh
cd latex-cyber
pdflatex -interaction=nonstopmode MeshCrowd_Cyber.tex
pdflatex -interaction=nonstopmode MeshCrowd_Cyber.tex
```

The output `MeshCrowd_Cyber.pdf` is produced.

### Requirements

- A TeX distribution (TeX Live / MiKTeX / MacTeX) with `IEEEtran`.
- Packages: `cite`, `graphicx`, `amsmath`, `amssymb`, `textcomp`, `array`,
  `booktabs`, `url`, `hyperref`, `algorithm`, `algpseudocode`.

### Notes

- References are inline via `thebibliography` (no `.bib` / BibTeX pass needed);
  numbering is in order of first citation and `cite` compresses ranges.
- The **new references** added for the cyber/gamification framing are: the
  physical-layer fingerprinting survey [10], multi-domain Wi-Fi fingerprinting
  [11], DFA-based RF fingerprinting [12], PhyFinAtt attack framework [13],
  EsaNet hardening [14], the gamified cybersecurity review [17], gamified
  security e-training [18], and gamified public-sector privacy/security
  awareness [19]. These are all recent peer-reviewed (IEEE, Elsevier, Springer,
  ACM, IET) sources — none from arXiv.
- The two wide diagrams use `figure*` (full text width); the five app screens are
  single-column at `0.58\columnwidth`.
- `Alg. 1` presents the reputation-weighted mesh confirmation procedure.
- Section `\ref{sec:method}` (Sec. IV) holds the Byzantine threat model, the
  alignment argument and the future physical-layer defence.

For a camera-ready submission, replace the placeholder author block and the
`\markboth` header with the real authors and submission ID.

### Reproducing the figures

The PNGs are modern 2× vector renders (shadows, gradients, refined
iconography). To regenerate from the project root:

```sh
node scripts/fig/render-modern.mjs   # writes all figures/*.png
node scripts/fig/make-pdf.mjs        # optional: figures-only PDF
```

then copy the resulting `figures/*.png` into this `latex-cyber/figures/`
directory.
