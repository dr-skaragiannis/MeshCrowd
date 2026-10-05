# MeshCrowd — Website Content

**Site title:** MeshCrowd · Multi-Band Passive RF Sensing on Commodity Smartphones

**Meta description:** MeshCrowd — multi-band passive RF sensing on commodity smartphones: dBm-based ranging, scan-epoch change detection, two-node transit counting, mesh-accrued accuracy and gamified community reporting.

This document contains all content text of the MeshCrowd website, organized by page and section.

---

## Table of Contents

1. [Global navigation](#global-navigation)
2. [Home](#home)
3. [Introduction](#introduction)
4. [Methodology](#methodology)
5. [App Screens](#app-screens)
6. [Ranging](#ranging)
7. [Evaluation](#evaluation)
8. [Community](#community)
9. [Conclusion](#conclusion)
10. [Footer](#footer)
11. [Appendix A — App screen copy (in-app UI text)](#appendix-a--app-screen-copy)

---

## Global Navigation

**Brand (logo + name):** MeshCrowd

**Desktop menu links (short labels):**

| Label | Path | Note |
|-------|------|------|
| Home | `/` | The one-screen summary |
| Intro | `/introduction` | The gap and four contributions |
| Method | `/method` | Physics, DSP, fusion, epochs |
| Screens | `/screens` | Six tabs of the deployed app |
| Ranging | `/ranging` | dBm → metres, or a refusal |
| Evaluation | `/evaluation` | Measured results and rejections |
| Community | `/community` | Gamified reporting and integrity |
| Conclusion | `/conclusion` | Uses, limits, references |

**Primary action button:** Full evaluation

**Full-screen mobile menu** (each item shows label, note, index number, and an icon):

- **Home** — The one-screen summary
- **Introduction** — The gap and four contributions
- **Methodology** — Physics, DSP, fusion, epochs
- **App Screens** — Six tabs of the deployed app
- **Ranging** — dBm → metres, or a refusal
- **Evaluation** — Measured results and rejections
- **Community** — Gamified reporting and integrity
- **Conclusion** — Uses, limits, references

**Mobile menu footer:** Read the full evaluation · Classifier weights v1.1 · on-device, Kotlin

---

## Home

### Hero

**Eyebrow:** System research report · build v1.1

**Headline:** Your phone is already a sensor.

**Sub-headline:** People and vehicles leave electromagnetic wakes. MeshCrowd reads them passively across BLE and dual-band Wi-Fi — counting, ranging and detecting change, and admitting exactly where the physics stops supporting it.

**Buttons:** See the app screens · How it works

**Tag pills:** Device-free · No camera · no mic · BLE + dual-band Wi-Fi · On-device Kotlin · Commodity hardware

**Floating stat cards (next to the phone):**

- **Live** — 33 passive links
- **Epoch delta** — 0 % false positives

**Headline numbers (build v1.1):**

| Value | Label |
|-------|-------|
| 4,161 | generated scenes replayed through the production Kotlin engine |
| 57.7 % | BLE per-crossing entity typing, measured over 378 occupied scenes |
| 0 % | epoch false positives at every tested distance, 2–20 m |
| 20–40 m | useful mesh radius, up from 4–12 m for a single phone |

### Four things, measured rather than promised

**Eyebrow:** What it does

**Headline:** Four things, measured rather than promised.

**Lede:** Every number below comes from the evaluation artefacts of the deployed Android build — not from a claim. Open a card for the full treatment.

**Cards (each links to a subpage):**

1. **Ranging** — *"A range, or a refusal."* — dBm becomes metres through log-distance inversion — gated at −75 dBm, hard-excluded at the −90 dBm noise floor, published as a band rather than a false point. **14–23 m** · illusions suppressed
2. **Change detection** — *"Two instants of the field."* — Every ≈10 s epoch stores a snapshot, resets the engine and rescans. The difference is computed from the median of the last 20 samples — never from a single noisy sample. **0 %** · false positives, all distances
3. **Counting** — *"Two phones make a barrier."* — Classic Bluetooth RFCOMM and BLE L2CAP turn two handsets into a roadside transit counter that types pedestrians and vehicles as they cross the line between them. **100 %** · detection at 3–10 m
4. **Community** — *"Incentives are the infrastructure."* — A mesh of 2–5 phones confirms each other's crossings, extends the useful radius, and pays a reliability bonus to the devices nearest the fused estimate. **20–40 m** · useful mesh radius

### Page directory

**Eyebrow:** The report

**Headline:** Read it in order, or jump in.

**Note:** The full paper is split into seven pages: introduction, methodology, screenshots, ranging, evaluation, community and conclusion.

**Directory list (numbered 01–07):**

1. **Introduction** — The gap and four contributions
2. **Methodology** — Physics, DSP, fusion, epochs
3. **App Screens** — Six tabs of the deployed app
4. **Ranging** — dBm → metres, or a refusal
5. **Evaluation** — Measured results and rejections
6. **Community** — Gamified reporting and integrity
7. **Conclusion** — Uses, limits, references

### Closing call-to-action band

**Headline:** 4,161 scenes. One honest record.

**Body:** Including the configurations the evidence rejected — because a result you cannot falsify is not a result.

**Button:** Open the evaluation

---

## Introduction

### Section header

**Eyebrow:** Section 1 · Introduction

**Headline:** Laboratory passive sensing versus one phone in a hand.

**Lede:** Device-free RF sensing is well established in controlled settings: radio tomographic imaging, learned field inversion and CSI activity classifiers all report strong numbers when node geometry is known and hardware is dedicated. MeshCrowd asks the harder question — what can a single, unmodified smartphone held by an ordinary user actually deliver in the field?

### The three compounding difficulties

1. **Detection is physics-limited** — Occlusion attenuation decays with distance through Fresnel-zone occupancy while the environment's own fluctuation grows with range. Past some distance the event is statistically indistinguishable from noise — a system that does not quantify that limit is misleading its user. *Tag:* 2 m → 68 m span measured
2. **RSSI ranging is ill-conditioned** — A log-distance model converts decibels into metres, but on weak links the inverse function explodes. An unconstrained estimate can be wrong by tens of metres and still look perfectly confident in a table. *Tag:* 14–23 m illusions suppressed
3. **Community mode is an attack surface** — A device can report forged beacons — spoofed SSIDs, rogue APs, phantom BLE advertising — or forged reports. The mesh mean, the very quantity gamified reliability rewards, becomes the target. *Tag:* integrity treated as first-class

### Four contributions, one honest method

**Sub-headline:** Plus the contribution that makes the others citable: a validation method that records its own rejections.

1. **01 · Multivariate multi-band fusion** — Per-link dip depth, duration, temporal texture, variance, prominence and multi-link coherence are computed for every detected event on every band, then fused at crossing level by EntityClassifier (shipped weight vector v1.1).
   - 1,512 Monte-Carlo scenes
   - BLE 57.7 % · 5 GHz 25.7 % · 2.4 GHz 16.1 %
   - Wi-Fi bands extend detection to 58–68 m
2. **02 · Honest dBm → metre ranging** — Log-distance inversion with per-band constants, a quality ladder from −20 dBm to the −90 dBm noise floor, an explicit gate at −75 dBm, and a radial-distance band f ∈ [0.15, 0.92] that turns an ambiguous link estimate into a stated range.
   - 288 validation scenes
   - Near 10 m / far 55 m AP layouts
   - Gate suppresses 14–23 m illusions
3. **03 · Scan-epoch change detection** — Each ≈10 s epoch stores a timed snapshot (timestamp, place, geo, per-link dBm table), the engine resets and rescans, and the difference between epochs is computed from stable levels — the median of the last 20 samples — or a transient dip of ≥ 3 dB.
   - 100 % detected at 2 m
   - 75–88 % at 4–8 m
   - 0 % false positives at every distance
4. **04 · Two-node counting + mesh** — A roadside transit counter over Classic Bluetooth RFCOMM and BLE L2CAP realises barrier coverage on commodity radios, and a mesh of 2–5 MeshCrowd instances confirms events with a reliability bonus for measurements near the fused estimate.
   - 100 % fused detection at 3–10 m
   - 94 % detection at 15 m
   - 0 false confirmations over 160 empty scenes

### The observable (field figure)

**Figure caption:** An occlusion is a Gaussian-profiled attenuation: 5–12 dB and jittery for a pedestrian, 15–26 dB and smooth for a vehicle, with amplitude decaying through Fresnel-zone occupancy. — *fig. 0 — the observable*

**Diagram labels:** beacon · AP · pedestrian · σ = 0.35 m · vehicle · σ = 1.15 m · A_eff · (1 + d/10)^−0.6

### Position in the literature

**Eyebrow:** Position in the literature

**Headline:** Five strands, one gap.

**Lede:** Prior work frequently reports accuracy without stating at which distance the signal-to-noise ratio actually supports it, treats classification and detection as one metric, or assumes synchronised nodes and CSI-capable chipsets that phones simply do not have.

1. **I · Device-free sensing & RTI** — Radio tomographic imaging reconstructs an attenuation field from many links (Wilson & Patwari, 2010); later work removes measurement artefacts training-free (Ma et al., 2021), recovers images generatively (Cao et al., 2020) and fuses spatiotemporal information (J. Zhang et al., 2021). CNN reconstruction on ESP32 meshes reports >92 % in controlled geometry (Jabbar & Shoaib, 2025). — **MeshCrowd:** We keep the detector tradition but replace learned field inversion with an explicit physical reading of each dip — because a hand-held phone has no known node geometry.
2. **II · Activity & identity recognition** — CSI pipelines classify performed activities (Jiao & Zhang, 2023; Hu et al., 2025), vision transformers operate on CSI (Luo et al., 2024), and identity is recoverable from RSSI distributions alone (R. Zhang & Jing, 2021). — **MeshCrowd:** Our target is opportunistic detection of people passing by, where only link-level RSSI exists and no one performed anything for us.
3. **III · Counting & flow** — Device-free counting with CSI and deep networks (Zhou et al., 2020b; Choi et al., 2022), Doppler-based throughput estimation (Zhou et al., 2020a), privacy-preserving fingerprint counting (Rusca et al., 2024), and barrier-coverage formalisation (Chang et al., 2018). — **MeshCrowd:** We realise the barrier geometry on commodity Bluetooth — two phones, no dedicated hardware.
4. **IV · Ranging & shadowing physics** — BLE positioning needs integrity monitoring against unstable beacons (Yao et al., 2020) and obstruction-aware treatment of missing links (Taşkan & Alemdar, 2021); body shadowing at 2.4 GHz is characterised (Januszkiewicz, 2018; Mamun et al., 2021); Fisher-information limits bound device-free localization in ISAC networks (Wang et al., 2026). — **MeshCrowd:** Beyond the range where link SNR carries position information, we report bands rather than points — and refuse below the floor.
5. **V · Participation, incentives, integrity** — Data-quality-guided incentives (Peng et al., 2018), ability-reputation mechanisms (Luo et al., 2021), coverage-and-reputation constraints (Zhang et al., 2020), and measurable engagement effects from gamification (Bitrián et al., 2021). — **MeshCrowd:** Quality-weighted reward becomes a reliability bonus for nodes nearest the fused estimate — which also makes trustworthiness an engineering target.

---

## Methodology

### Section header

**Eyebrow:** Section 2 · Methodology

**Headline:** Physics first, then the refusal to over-claim.

**Lede:** MeshCrowd observes three families of links. Received power follows log-distance path loss, an occlusion is a Gaussian-profiled attenuation whose amplitude decays with closest-approach distance through a Fresnel-efficiency term, and every constant downstream of that model was either adopted or rejected on complete scenes.

### Sensing model

**Label:** Sensing model

**Equation:** RSSI(d) = PL₀ − 10·n·log₁₀(d)

**Body:** Environmental fluctuation is lognormal scintillation whose standard deviation grows with range (0.45–0.70 dB at short range, +0.055 dB/m). Occlusion amplitude scales as (1 + d/10)^−0.6; lateral width σ is 0.35 m for a pedestrian and 1.15 m for a vehicle.

### Entity signatures

**Label:** Entity signatures

- **Pedestrian** — 5–12 dB dips, jittery texture, 3.1 Hz body wobble of ≈0.9 dB.
- **Vehicle** — 15–26 dB smooth, long blockages; occlusion ≈25 dB capped at 34 dB with 5.5 Hz flutter.
- Confusion concentrates in the central 4–13 dB band — which is exactly where the classifier declines to be confident.

### Three measured detector decisions

**Label:** Three measured detector decisions

- **Noise-aware trigger floor** — A dip must exceed a floor derived from the link's own fluctuation.
- **Sustained-trigger gate** — The trigger must persist across a minimum number of samples.
- **Stable-level policy** — Compare medians of the last 20 samples, never single samples.

### Per-band reference constants and measured yield

**Headline:** Per-band reference constants and measured yield

**Body:** Fusion is asymmetric by design. BLE carries event typing; the Wi-Fi bands contribute reach. Averaging the three bands was tested and rejected — it dragged BLE's 57.7 % down to 31 %.

| Band | Hz | Exponent n | R at 1 m | A₀ at reference | Per-crossing | Max leg | Role in the fusion |
|------|-----|-----------|----------|-----------------|--------------|---------|--------------------|
| BLE | 2.4 GHz | 2.4 | −42 dBm | 7.2 dB | 57.7 % | 24 m | Fast, dense human signature — samples close to the body and often. |
| Wi-Fi 2.4 | 2.4 GHz | 2.6 | −38 dBm | 9.1 dB | 16.1 % | 58 m | Coverage at intermediate distance with the lowest fluctuation floor. |
| Wi-Fi 5 | 5 GHz | 2.9 | −35 dBm | 11.5 dB | 25.7 % | 68 m | Strongest per-link attenuation over longer links (A₀ = 11.5 dB). |

### Signal-processing chain

**Label:** Signal-processing chain

- **RingWindow** — Keeps the recent (timestamp, dBm) samples of every link in a bounded ring buffer.
- **Stats** — Maintains the median and a robust dispersion estimate, insensitive to single-sample spikes.
- **BaselineTracker** — Estimates the adaptive no-event level of each link, so a quiet link is judged by a quiet yardstick.
- **DipDetector / PeakDetector** — Segments the stream into events: depth, duration, and the competing peaks that set prominence.

### Feature space per event

**Label:** Feature space per event

- **Depth** — dB of the dip below the adaptive baseline
- **Duration** — ms of the occlusion
- **Texture** — jitter ratio in-event: smooth block vs. wobbling shape
- **Variance** — of the event series
- **Prominence** — depth relative to competing peaks in the window
- **Coherence** — number of links registering the event in a common interval

**Note:** Coherence is the primitive that everything else is built on: the same number of links agreeing inside a common interval becomes the mesh confirmation rule, the transit barrier evidence, and the trigger for awarding a fusion bonus.

### Architecture figure (Figure 1)

**Caption:** Figure 1 — functional decomposition. Each stage produces the artefacts (per-link dBm tables, epoch tables, transit counts, mesh ledgers) that the evaluation replays and audits.

**Diagram text (radio front-ends):** BLE scan · beacons · 2.4 GHz · Wi-Fi scan · APs · 2.4 GHz · Wi-Fi scan · APs · 5 GHz · Classic BT + BLE L2CAP · two-node counter link

**Per-link DSP:** Per-link DSP — production Kotlin classes · RingWindow · Stats (median, robust dispersion) · BaselineTracker · DipDetector / PeakDetector · *noise-aware floor · sustained gate*

**Processing columns:**

- **Feature extraction** — depth · duration · texture / variance · prominence · coherence
- **dBm → metres** — log-distance per band / gate −75 dBm · f ∈ [0.15, 0.92]
- **Scan-epoch delta** — store → reset → rescan / stable level = median of last 20

**Output:** EntityClassifier v1.1 → entity · confidence · event record — Counters · range band · field verdict · transit count · mesh confirmation · XP — *artefacts: tables + logs*

### Scan-epoch change detection

**Eyebrow:** Scan-epoch change detection

**Headline:** The difference between two instants of the field.

**Lede:** A single RSSI sample carries about 1 dB of standard deviation, so comparing last samples is comparing noise. MeshCrowd instead treats the field as two timed snapshots and computes their difference from stable levels — which is why the false-positive rate collapses from 25–62 % to zero at every tested distance.

**The four steps:**

1. **Store** — A timed snapshot: timestamp, place, geo and the full per-link dBm table.
2. **Reset** — The engine clears its baselines and ring windows. Nothing carries over.
3. **Rescan** — A fresh epoch is captured on the same ≈10 s moving-object time scale.
4. **Compare** — Stable levels — median of the last 20 samples — or a transient dip of ≥ 3 dB.

**Movement detection and false positives** (*per distance · measured*):

| Distance | Movement detected (stable-level) | False positives (naive last-sample) |
|----------|----------------------------------|------------------------------------|
| 2 m | 100 % | 25 % |
| 4 m | 88 % | 34 % |
| 6 m | 81 % | 41 % |
| 8 m | 75 % | 48 % |
| 12 m | 62 % | 55 % |
| 20 m | 44 % | 62 % |

**Legend:** movement detected — 20-sample median rule · false positives — naive last-sample comparison

**Note:** The naive rule is not merely noisier — it reports movement on completely empty scenes. Every candidate replacement was required to win on complete scenes, not on row-level aggregates, before it shipped.

**The verdict string:**

> 5 links moved ≥3 dB (max 14.0 dB) → field CHANGED since previous scan

Verdicts are computed, not asserted. A quiet room returns "unchanged" with the same arithmetic that returns CHANGED when someone walks past — and both outcomes are logged with their link tables.

**Why ≈10 seconds:** The epoch interval is set by the time scale of the phenomenon: a pedestrian crossing a link leg occupies a few seconds, a vehicle less. Shorter epochs compare partially-formed events; longer ones merge two crossings into one verdict.

**Epoch pills:** 10 s epoch · median 20 · ≥ 3 dB transient · cap 120 scans

---

## App Screens

**Eyebrow:** App screenshots

**Headline:** The whole engine, six tabs on one handset.

**Lede:** MeshCrowd is a native Android application. Nothing below is a mock-up of an idea — these are the screens that carried the measurement campaign, reproduced from the deployed build.

### Tab 1 of 6 — Sense

**Caption:** The live instrument. Three radio front-ends are polled without ever connecting to them, and every observable link becomes a measurement ray whose attenuation state is tracked in real time.

**Key points:**

- 33 passive links across BLE, Wi-Fi 2.4 GHz and Wi-Fi 5 GHz inside a 20 m radius
- Counters for people (67), vehicles (66), raw disturbances (165) and live links (33)
- Live feature readout — moving variance 11.45 dB², jitter 1.79 dB, classifier confidence 68 %
- Attenuation envelope: max dip below the adaptive baseline, markers = recent crossings

**Note:** Screens are rendered from the production layout: the same counters, the same constants and the same verdict strings the engine emits — including refusals such as links held below the noise floor.

### Tab 2 of 6 — Scans

**Caption:** Scan-epoch change detection on a ≈10 s moving-object time scale. The phone stores a timed snapshot of the whole field, resets the engine, rescans, and then computes the difference between the two instants.

**Key points:**

- Window 19:56:03 – 19:56:18, place and geo captured with the per-link dBm table
- Delta computed from stable levels: 33 links · 5 moved ≥ 3 dB (max 14.0 dB)
- Field verdict CHANGED since previous scan — after the 20-sample median replaced last-sample comparison
- History capped at 120 scans; each row opens the full per-link dBm table

### Tab 3 of 6 — Mesh

**Caption:** Mesh-accrued accuracy. Neighbouring MeshCrowd instances exchange crossing records, and the geometric diversity of their rays both raises accuracy and pushes the useful radius outward.

**Key points:**

- 2–5 cooperating nodes confirm each other's crossings before a count is published
- Effective radius extends from 4–12 m (single phone) toward 20–40 m
- Zero false confirmations measured across 160 audited empty scenes
- Reliability bonus: devices nearest the fused estimate earn a ×1.25 multiplier

### Tab 4 of 6 — Transit

**Caption:** The two-node roadside counter. Two phones form a barrier across a road over Classic Bluetooth RFCOMM and BLE L2CAP, and a hybrid link-presence/loss classifier counts and types what passes between them.

**Key points:**

- 100 % fused detection and 100 % entity typing at 3–10 m separations
- 94 % detection at 15 m — the honest decay is shown, not hidden
- Per-link presence and loss are fused, so a link drop and a link appearance are both evidence
- Unattributed dips are held below threshold rather than counted

### Tab 5 of 6 — Club

**Caption:** The incentive machinery. Gamification is not cosmetic here — it is what keeps a voluntary sensing mesh alive, and it makes the trustworthiness of contributed measurements a first-class problem.

**Key points:**

- People +10 XP · vehicles +14 XP · disturbances +2 XP
- ×2 fusion bonus and +15 XP when a crossing is confirmed by ≥ 2 mesh nodes
- Fused accuracy and crowd level are reported back to the contributor
- Badges and day streaks reward keeping sensors on, not reporting volume

### Tab 6 of 6 — Settings

**Caption:** Every constant that ships is exposed, because every one of them was the outcome of an executed calibration-and-rejection protocol on the Monte-Carlo harness.

**Key points:**

- Radius 10 / 20 / 40 m, and per-band radios that can be switched off individually
- Range gate at −75 dBm and a hard noise floor at −90 dBm where ranging is refused
- Radial-distance band f ∈ [0.15, 0.92] replaces a false point estimate
- Privacy boundary: no camera, no microphone, no stored beacon identifiers

---

## Ranging

### Interactive · ranging

**Headline:** A range, or a refusal?

**Body:** On a weak link the inverse of the log-distance model is extremely ill-conditioned, and an unconstrained estimate can be wrong by tens of metres. MeshCrowd therefore reports a radial band f ∈ [0.15, 0.92] instead of a point, gates estimation at −75 dBm, and hard-excludes links at or below the −90 dBm floor from range and accuracy mathematics — they are retained only for multi-link agreement.

**Note:** Drag the received strength below and watch the gate take over. On the 288-scene validation the gate demonstrably suppressed 14–23 m illusions that the naive inversion would have published as fact.

**Interactive control:** Observed link strength — slider from −20 to −95 dBm. *Axis labels:* −20 strong · −75 gate · −90 floor

**Band selector:** BLE · 2.4 GHz · Wi-Fi 2.4 · 2.4 GHz · Wi-Fi 5 · 5 GHz

**Quality ladder:**

| Level | Range | Note |
|-------|-------|------|
| Strong | −20 … −55 dBm | direct path likely, tight band |
| Good | −55 … −65 dBm | usable estimate, narrow band |
| Usable | −65 … −75 dBm | band reported, gate boundary |
| Weak | −75 … −90 dBm | range refused, band only |
| Noise floor | −90 … −∞ dBm | excluded from range and accuracy maths |

**Verdict behaviour:**

- **When gated (≤ −75 dBm):** *Range refused.* The unconstrained inversion would have said X m from a Y dBm [band] link with n = Z. MeshCrowd publishes no distance for this link and keeps it for multi-link agreement only. *(axis marker: naive X m — refused)*
- **When not gated:** *[lo] – [hi] m.* Point estimate X m, published as the radial band f ∈ [0.15, 0.92] → [lo]–[hi] m from a Y dBm [band] link (n = Z, R₁ₘ = W dBm). *(axis: 80 m axis)*

---

## Evaluation

### Section header

**Eyebrow:** Section 3 · Evaluation

**Headline:** What was measured, and what the same evidence rejected.

**Lede:** Every constant that ships was first executed against a measurement harness that replays generated scenes through the production signal-processing code, then subjected to a falsification protocol: a candidate change is adopted only if it wins on complete scenes, not on row-level aggregates.

### Harness figures

| Value | Label |
|-------|-------|
| 4,161 | generated scenes replayed through the production Kotlin engine |
| 1,512 | Monte-Carlo scenes for multi-band fusion |
| 378 | occupied scenes per band in the per-band evaluation |
| 288 | ranging scenes, near 10 m and far 55 m AP layouts |
| 160 | empty scenes audited for false positives and confirmations |
| 13 pp. | published full evaluation report (PDF) backing this page |

### Per-radius accuracy matrix

**Headline:** Per-radius accuracy matrix

**Body:** Accuracy is stated per radius because a single number would be a lie of aggregation. Detection — the weaker claim — survives further out than typing; beyond ~20 m the Fisher information about position along a link collapses and the system reports bands rather than points.

| Radius | BLE typing | Wi-Fi 5 GHz | Wi-Fi 2.4 GHz | Detection (fused) |
|--------|-----------|-------------|---------------|-------------------|
| 2 m | 92 % | 74 % | 61 % | 100 % |
| 4 m | 84 % | 62 % | 48 % | 88 % |
| 6 m | 76 % | 55 % | 41 % | 81 % |
| 8 m | 68 % | 49 % | 35 % | 75 % |
| 12 m | 57 % | 44 % | 28 % | 62 % |
| 20 m | 47 % | 38 % | 22 % | 44 % |
| 40 m | 22 % | 29 % | 17 % | 21 % |
| 68 m | 6 % | 18 % | 11 % | 8 % |

**Note:** Matrix values are the measured per-radius yields of the deployed classifier on generated scenes; BLE reaches 57.7 % per-crossing typing overall against 25.7 % (5 GHz) and 16.1 % (2.4 GHz).

### Two-node transit counter

- **100 %** — fused detection at 3–10 m separations
- **100 %** — entity typing at 3–10 m (pedestrian vs. vehicle)
- **94 %** — detection at 15 m separation
- **2 links** — Classic BT RFCOMM + BLE L2CAP, presence ∧ loss fused

### Mesh agreement

- **0** — false confirmations across 160 empty scenes
- **2–5** — cooperating instances per mesh
- **20–40 m** — useful radius, from 4–12 m single-phone
- **×1.25** — reliability bonus nearest the fused estimate

### Mesh & transit results (dark strip)

**Eyebrow:** Mesh & transit results

**Headline:** Two phones make a barrier. Five make a verdict.

**Body:** A single handset is one measurement ray, so it is limited by the geometry it happens to be held at. Federating 2–5 MeshCrowd instances adds rays — and rays that disagree with the majority are down-weighted before a count is published. Accuracy accrues to the mesh, and the radius extends with it.

**Results:**

| Value | Label | Note |
|-------|-------|------|
| 100 % | fused two-node detection | at 3–10 m separations |
| 0 | false mesh confirmations | across 160 empty scenes |
| 94 % | detection at 15 m | the decay is published, not hidden |
| 20–40 m | useful mesh radius | from 4–12 m single-phone |

**Diagram labels:** one crossing · three rays · agreement · single 4–12 m · mesh 20–40 m

**Note:** The same coherence primitive drives the roadside counter: two nodes across a road over Classic Bluetooth RFCOMM and BLE L2CAP, with link presence ∧ link loss fused so that a drop and an appearance are both evidence.

### Calibration record

**Headline:** Calibration record

**Body:** Stating what the system achieves is only half the record. The same evidence rejected these candidates — including a ranging policy that survives in the shipped binary as a refusal rather than an estimate.

| Change | Verdict | Detail |
|--------|---------|--------|
| Noise-aware trigger floor | accepted | Dip must exceed a floor derived from the link's own measured fluctuation: a quiet link triggers on less than a noisy one. Won on complete scenes. |
| Sustained-trigger gate | accepted | Trigger must persist for a minimum number of samples; removes isolated single-sample glitches without losing crossings. |
| 20-sample median stable level | accepted | Replaced naive last-sample comparison, which carried a 25–62 % false-positive rate. The median collapses ≈1 dB fluctuation before comparison. |
| −75 dBm range gate + f ∈ [0.15, 0.92] | accepted | Refuses point estimates on weak links and reports a radial band instead. Suppresses 14–23 m illusions on 288 scenes. |
| Ranging from −90 dBm links | rejected | Links at the noise floor are excluded from range and accuracy mathematics and retained only for multi-link agreement. A refusal, not an estimate. |
| Equal-weight band fusion | rejected | Averaging the three bands dragged BLE's 57.7 % down to 31 %. Fusion stays asymmetric by design: BLE carries event typing. |
| Naive last-sample epoch delta | rejected | 25–62 % false positives on empty scenes. Every candidate that won on row-level aggregates but lost on complete scenes was discarded. |

### Condition matrix for further evaluation

| Axis | Span |
|------|------|
| Entity lateral profile | pedestrian σ = 0.35 m · vehicle σ = 1.15 m |
| Occlusion depth | 7–34 dB, vehicle cap 34 dB, 5.5 Hz flutter |
| Closest approach | 0.5–20 m, Fresnel term (1 + d/10)⁻⁰·⁶ |
| AP layout | near 10 m · far 55 m · mixed |
| Link occupancy | 33 links typical, 12–68 m leg lengths |
| Scene emptiness | 160 empty scenes for false-positive audit |

### Method of validation

**Label:** Method of validation

The harness is not a simulator beside the app — it is the app's own code. Scenes are replayed through the production Kotlin classes, so a change that looks better in a notebook but loses on complete scenes never reaches a release. That is why this page can state, with equal precision, both the configuration that shipped and the configuration the evidence threw away.

---

## Community

### Section header

**Eyebrow:** Gamified community reporting

**Headline:** Incentives are the infrastructure.

**Lede:** A sensing mesh built from phones that people already own has no deployment budget — it has participants. Mobile crowdsensing research is unambiguous on this point: users contribute when mechanisms are transparent, rewarded and socially engaging, and quality-weighted rewards outperform raw volume.

**Body:** Gamification here is therefore not cosmetic. Points, badges and progress feedback are the machinery that keeps a voluntary mesh alive — and the same machinery makes the trustworthiness of contributed measurements an engineering problem rather than an afterthought.

### Reward schedule

| Action | Reward |
|--------|--------|
| Pedestrian crossing | +10 XP |
| Vehicle crossing | +14 XP |
| Disturbance logged | +2 XP |
| Confirmed by ≥ 2 mesh nodes | +15 XP and ×2 fusion bonus |
| Nearest the fused estimate | ×1.25 reliability multiplier |
| Day streak, sensor kept on | streak + badge ladder |

### Privacy boundary

- Device-free: nothing is attached to, or carried by, the observed target.
- No camera and no microphone are used or requested, anywhere in the app.
- Beacon identifiers (MAC, SSID) are not persisted; per-link dBm tables stay on device.
- Only aggregate crossing records leave the handset, and only when a mesh exists.
- Presence is inferred from attenuation, never from identity — counting without identifying.

### The adversarial surface, stated openly

**1. Forged beacons** — Spoofed SSIDs, rogue access points and phantom BLE advertising can be injected to manufacture disturbances. — *Planned defence:* Physical-layer fingerprints rather than identifiers (Wu et al., 2020); client-side round-trip-time rogue-AP analysis (Kitisriworapan et al., 2020).

**2. Forged reports** — A node can publish crossings it never observed, dragging the mesh mean — and every bonus computed from it. — *Planned defence:* Reputation-weighted fusion, agreement tolerance, and down-weighting of rays that disagree with the majority.

**3. Protocol-level attack** — Downgrade attacks on key negotiation and known privacy flaws in the BLE specification affect the radios we ride on. — *Planned defence:* BLE security survey bounds (Cäsar et al., 2022; Barua et al., 2022; Antonioli et al., 2020; Wu et al., 2024) define the future adversarial module.

---

## Conclusion

### How it can be used

**Eyebrow:** How it can be used

**Headline:** Deployed for free, by people who already carry the sensor.

**Lede:** Because the sensing hardware is the handset, the marginal cost of a new measurement point is approximately zero — and because the observer holds no camera, the privacy argument is structural rather than promised.

- **Ambient assisted living** — Presence and crossing counts in a home without cameras, worn devices or a hardware installation.
- **Occupancy analytics** — Flow through a workplace, a shop or a corridor, measured opportunistically by the devices already inside it.
- **Roadside traffic studies** — Two phones on opposite sides of a road become a barrier counter with typed pedestrian and vehicle flow.
- **Coverage scouting** — Scan epochs make the RF field itself the subject: what changed here since the last pass, and by how many dB.

### Section 4 · Conclusion & future work

**Headline:** State the achievement. State the limit. Repeat.

**Body 1:** MeshCrowd demonstrates that a commodity phone can perform multi-band passive sensing end to end: fuse BLE and dual-band Wi-Fi features into entity typing, convert measured dBm into a stated range with an explicit gate, detect change between two instants of the field without inventing movement, count transit across a two-node Bluetooth barrier, and accrue accuracy by agreeing with neighbours — while a gamification layer keeps the volunteers coming back.

**Body 2:** Just as importantly, it reports where the physics withdraws its support: 0 % typing accuracy past ~68 m on BLE, 94 % rather than 100 % detection at 15 m, and a noise floor below which ranging is not merely uncertain but refused.

**Future work:**

- **Cybersecurity module** — Malicious SSIDs, rogue access points and forged reporting are the next front: physical-fingerprint spoofing detection, RTT-based rogue-AP analysis and reputation-weighted fusion, validated on the same falsification protocol.
- **Extending the club** — Team meshes, seasonal ladders and quality-weighted seasons that reward accuracy rather than volume — with the reliability bonus becoming a published, auditable score.

**Buttons:** Back to the screens · Back to home

### References

1. Wilson & Patwari (2010) — radio tomographic imaging of device-free users
2. Armenta-Garcia et al. (2024) — survey of RSSI/CSI detection pipelines
3. Januszkiewicz (2018) — human-body shadowing at 2.4 GHz
4. Mamun et al. (2021) — compensating body shadowing with landmarks
5. Cao et al. (2020) — generative recovery of attenuation images
6. Ma et al. (2021) — training-free handling of RTI measurement artifacts
7. Jabbar & Shoaib (2025) — CNN reconstruction from Wi-Fi RSSI on ESP32 meshes
8. Booranawong et al. (2019); Pochaiya et al. (2026) — adaptive RSSI thresholds
9. Yao et al. (2020); Taşkan & Alemdar (2021) — RSSI integrity monitoring
10. Jiao & Zhang (2023); Luo et al. (2024); Hu et al. (2025) — CSI activity recognition
11. R. Zhang & Jing (2021) — device-free identification from RSSI distributions
12. Zhou et al. (2020a, 2020b); Choi et al. (2022) — device-free counting
13. Rusca et al. (2024) — privacy-preserving Wi-Fi fingerprint counting
14. Chang et al. (2018) — barrier coverage in sensor networks
15. Wang et al. (2026) — Fisher-information limits of device-free localization
16. Peng et al. (2018); Luo et al. (2021); Zhang et al. (2020) — crowdsensing incentives
17. Bitrián et al. (2021) — gamification and engagement
18. Cäsar et al. (2022); Barua et al. (2022); Antonioli et al. (2020) — BLE security
19. Wu et al. (2020, 2024) — physical-fingerprint spoofing detection, BLE privacy flaws
20. Agyemang et al. (2020); Kitisriworapan et al. (2020) — rogue access-point detection

---

## Footer

**Brand:** MeshCrowd

**Description:** Multi-band passive RF sensing on commodity smartphones with dBm-based ranging, scan-epoch change detection, two-node transit counting, mesh-accrued accuracy and gamified community reporting.

**Trust pills:** Device-free · No camera · no mic · On-device only

**Report links:** Introduction · Methodology · App Screens · Ranging · Evaluation · Community · Conclusion

**Artefacts:**

- `app/` — deployed Android app
- `experiments/` — Monte-Carlo harness
- `reports/FULL_EVALUATION_REPORT.pdf`

**Bottom bar:** System research report · figures taken from measured evaluation artefacts. · Classifier weights v1.1 · on-device, Kotlin

---

## Appendix A — App screen copy (in-app UI text)

### Sense tab

- Title: **MeshCrowd** — Passive RF sensing — people & vehicles leave electromagnetic wakes
- **Sensing the RF field** — 33 passive links · BLE + Wi-Fi · 20 m radius — *Stop*
- **People:** 67 · **Vehicles:** 66 · **Disturbances:** 165 · **RF links:** 33
- **Live signal features** — Moving variance 11.45 dB² · Jitter 1.79 dB · Classifier confidence 68%
- *Radius 20 m* · *Range 0–20 m*
- **Attenuation envelope** — Max dip below adaptive baseline · markers = recent crossings
- **Last crossing** — Entity: pedestrian · 68 % · Dominant band: BLE · −58 dBm dip · Range band: f 0.41 → 4.4–8.2 m · Coherent links: 3 of 33 · Depth · duration: 8.4 dB · 1.9 s
- **Scan epoch** — Next epoch in: 6 s · Stable level: median · last 20 samples · Field since previous: CHANGED · 5 links ≥ 3 dB

### Scans tab

- **Latest stored scan** — stored, then the engine reset and rescanned
  - Window: 19:56:03 – 19:56:18 (15s)
  - Place: My place
  - Geo: 40.3075, 21.7906
  - Counts (this window): p 0 · v 0 · o 1
  - Links / changed: 33 · 5 moved ≥3 dB
  - *5 links moved ≥3 dB (max 14.0 dB) → field CHANGED since previous scan*
- **History** — 120 scans stored (cap 120) — tap a row for the per-link dBm table — *Clear*
  - 19:56:03 · My place · 15s — p 0 · v 0 · o 1 · 33 links · field CHANGED (5 links moved)
  - 19:55:48 · My place · 15s — p 0 · v 0 · o 1 · 33 links · field CHANGED (7 links moved)
  - 19:55:40 · My place · 5s — p 0 · v 0 · o 0 · 33 links · unchanged
  - 19:55:35 · My place · 5s — p 0 · v 0 · o 0 · 33 links · unchanged
  - 19:55:30 · My place · 5s — p 0 · v 0 · o 0 · 33 links · unchanged
  - 19:55:25 · My place · 5s — p 0 · v 0 · o 0 · 33 links · unchanged
  - 19:55:19 · My place · 5s — p 0 · v 0 · o 0 · 33 links · unchanged

### Mesh tab

- Title: **Mesh** — Agreement between nearby MeshCrowd instances
- **Nodes in your mesh** — 2–5 instances confirm each other's crossings
  - This phone · Pixel 8 — 72%
  - node-2 · Galaxy A54 — 69%
  - node-3 · Xiaomi 12 — 64%
  - Fused accuracy: 81 % · Agreement tolerance: ±1 crossing / ±4 m · Effective radius: 20–40 m (single: 4–12 m)
- **Radius extension** — Geometric diversity of measurement rays — mesh 20–40 m · single 4–12 m — *Three phones see one crossing from three angles; rays that disagree are down-weighted before the count is published.*
- **Confirmation ledger** — 160 empty scenes audited — Crossings confirmed (1 h): 14 · False confirmations: 0 · Rogue beacons flagged: 2 · −90 dBm links held for agreement only: 6
- **Reliability bonus** — Distance from the mesh mean — *Devices whose measurements lie closest to the fused estimate earn a ×1.25 reward multiplier; outliers keep earning but never set the mesh value.* — you ×1.25 · node-2 ×1.0 · node-3 ×0.9

### Transit tab

- Title: **Transit** — Two-node roadside counter · barrier coverage on commodity Bluetooth
- **Barrier link** — Classic BT RFCOMM + BLE L2CAP — node A · node B · barrier · 8 m separation
- **Pedestrians:** 12 · **Vehicles:** 8
- **Link state** — RFCOMM (Classic): connected · 8.1 pps · BLE L2CAP: connected · 4.0 pps · Separation: 8 m · Hybrid classifier: presence ∧ loss · Entity typing: 100 % at 3–10 m
- **Detection by separation** — Fused two-node detection: 3 m 100 % · 6 m 100 % · 10 m 100 % · 15 m 94 % · 25 m 61 %
- **Session** — Roadside · 41 min — Flow estimate: 17 entities / 41 min · Peak: 18:52 · 4 in 5 min · Unattributed dips: 2 · held below threshold

### Club tab

- **Mesh contribution** — What the fusion network reports through you — Nodes in your mesh: 1 · Fused accuracy: 72% · Crowd level: Calm · Confirmed crossings (1 h): 0
- **Scoring** — People +10 XP · Vehicles +14 XP · Disturbances +2 XP. When a crossing is confirmed by ≥2 mesh nodes you earn a ×2 fusion bonus +15 XP per confirmation — so running the app on several phones in the same area not only raises counting accuracy (multi-angle cross-filtering), it literally multiplies your score. Day streaks and badges reward keeping sensors on.
- **Session history** — Sep 6, 19:21 — 43 · 43 · ambient / Sep 6, 19:20 — 43 · 43 · ambient / Sep 6, 19:02 — 24 · 35 · ambient / Sep 6, 18:45 — 18 · 30 · ambient / Sep 6, 18:45 — 18 · 30 · ambient / Sep 6, 18:27 — 4 · 3 · ambient / Sep 6, 17:19 — 50 · 64 · ambient / Sep 6, 17:19 — 50 · 63 · ambient / Sep 6, 17:18 — 43 · 63 · ambient / Sep 6, 17:18 — 41 · 62 · ambient
- **Badges** — Keeping sensors on is the whole game — 🥉 First 10 crossings (unlocked) · 🌙 Night watch · 4 h (unlocked) · 🕸️ Mesh of 3 (unlocked) · 🎯 50 % fused accuracy (unlocked) · 🛡️ Rogue beacon reporter (locked) · 🔥 30-day streak (locked)

### Settings tab

- Title: **Settings** — Every shipped constant came from an executed calibration
- **Sensing** — Radius: 10 m · 20 m · 40 m — BLE beacons · 2.4 GHz (on) · Wi-Fi APs · 2.4 GHz (on) · Wi-Fi APs · 5 GHz (on) · Classic BT RFCOMM counter (on)
- **Ranging** — dBm → metres, with an explicit refusal — Range gate: −75 dBm · Noise floor: −90 dBm (excluded) · Radial band: f ∈ [0.15, 0.92] · BLE n · R₁ₘ: 2.4 · −42 dBm · Wi-Fi 2.4 n · R₁ₘ: 2.6 · −38 dBm · Wi-Fi 5 n · R₁ₘ: 2.9 · −35 dBm
- **Scan epochs** — Epoch interval: 10 s · Comparison rule: stable level · median 20 · Transient dip: ≥ 3 dB · History cap: 120 scans
- **Privacy** — Camera & microphone (off) · Store beacon identifiers (off) · Upload raw dBm tables (off) · Aggregate mesh reports (on)
- **About** — Classifier weights: v1.1 · Engine: Kotlin · on-device · Evaluation: 13-pp report · PDF
