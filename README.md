# MeshCrowd

> Multi-Band Passive RF Sensing on Commodity Smartphones

MeshCrowd is a device-free, multi-band passive radio-frequency (RF) sensing system that runs entirely on an unmodified commodity smartphone. It passively observes the received signal strength (RSSI) of Bluetooth Low Energy (BLE) beacons and dual-band (2.4 GHz and 5 GHz) Wi-Fi access points without ever associating to them, converting each observable link into a measurement ray whose attenuation state is monitored in real time.

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.2-61DAFB)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7.3-646CFF)](https://vitejs.dev/)

## 🌟 Key Features

- **Multi-band fusion**: Combines per-link features across BLE (2.4 GHz), Wi-Fi 2.4 GHz, and Wi-Fi 5 GHz to classify pedestrian vs. vehicle crossings
- **Honest dBm→metre ranging**: Log-distance inversion with explicit quality ladder and hard gating below the noise floor (refuses to estimate when physics doesn't support it)
- **Scan-epoch change detection**: Compares two timed snapshots of the RF field from stable levels to detect movement with zero false positives in evaluation
- **Two-node transit counting**: Roadside barrier counter using Classic Bluetooth RFCOMM and BLE L2CAP
- **Mesh federation**: Multiple cooperating instances confirm events, extend effective range, and improve accuracy through geometric diversity
- **Gamified reliability**: Rewards participation and grants reliability bonuses to devices whose measurements align with the mesh consensus

## 📊 Performance Highlights

Evaluated on a 4,161-scene Monte-Carlo harness replayed through production Kotlin signal-processing code:

- **Typing accuracy**: BLE achieves 57.7% per-crossing vs. 25.7% (Wi-Fi 2.4GHz) and 16.1% (Wi-Fi 5GHz)
- **Epoch detection**: 100% movement detection at 2m with **0% false positives** at every tested distance
- **Transit counting**: 100% fused detection at 3–10m, 94% at 15m
- **Mesh extension**: Extends useful radius from 4–12m (single phone) toward 20–40m with zero false confirmations across 160 empty scenes

## 🗂️ Project Structure

```
ambientsense/
├── src/                    # React/Vite website application (MeshCrowd site)
├── evaluation/             # Reproducible evaluation harness and datasets
├── latex/                  # IEEE two-column manuscript (LaTeX)
├── latex-cyber/            # Cybersecurity & gamification manuscript variant
├── scripts/fig/            # Figure generation and export utilities
├── figures/                # Generated figures and assets
├── app/                    # Android application (as referenced in paper)
└── index.html              # Entry point for web build
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- Modern web browser

### Installation

```bash
# Clone the repository
git clone https://github.com/<your-username>/MeshCrowd.git
cd MeshCrowd

# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Building

The project uses Vite for building. The production build outputs to `dist/` directory.

## 📈 Evaluation & Reproducibility

The `evaluation/` directory contains a complete reproducible evaluation package:

- Monte-Carlo scene generation and replay through production signal-processing logic
- Validation scripts and data schemas
- Manifest and data dictionary for full reproducibility

To run evaluations:

```bash
cd evaluation
node run.mjs
```

See [evaluation/README.md](evaluation/README.md) for detailed instructions.

## 📚 Documentation

- [MeshCrowd_Paper.md](MeshCrowd_Paper.md) - Full technical manuscript
- [Website.md](Website.md) - Website content reference
- [evaluation/DATA_DICTIONARY.md](evaluation/DATA_DICTIONARY.md) - Evaluation data schema

## 🔬 Technical Approach

MeshCrowd operates by:

1. **Passive RF observation**: Scans BLE advertisements and Wi-Fi AP beacons without association
2. **Per-link DSP**: Maintains adaptive baselines, detects dips via noise-aware triggers with sustained gating
3. **Feature fusion**: Extracts dip depth, duration, temporal texture, variance, prominence, and multi-link coherence
4. **Physics-grounded ranging**: Applies log-distance model with per-band calibration and explicit refusal when below noise floor (-90 dBm)
5. **Epoch differencing**: Compares stable-level field snapshots to isolate genuine movement
6. **Mesh consensus**: Federates observations across devices with majority agreement and outlier down-weighting

## 🛡️ Privacy

MeshCrowd is designed with privacy as a core principle. It operates passively without connecting to observed networks, focuses on aggregate propagation changes rather than identifying individuals, and the mesh consensus mechanism emphasizes collective behavior over personal tracking.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

This work builds on research in device-free sensing, radio tomographic imaging, mobile crowdsensing, and RF propagation modeling. The evaluation harness validates every shipped constant through falsification on complete scenes.

---

*MeshCrowd: What a single, unmodified smartphone can actually deliver in the field — with equal precision about where it cannot.*