1. Exact Title
Bangla Speech-to-Speech Voice Cloning and Accent Conversion Using a Novel Parallel Accent Corpus

2. Document Type & Status
Bachelor of Science (B.Sc.) Thesis
Shahjalal University of Science and Technology (SUST), Sylhet, Bangladesh
Date: July 18, 2026

3. Your Specific Role
Co-Author (Undergraduate Researcher) – Transitioned the foundational BPAC dataset into applied generative AI by designing, executing, and evaluating textless speech-to-speech architectures. Conducted rigorous comparative studies of state-of-the-art voice cloning models and engineered regional accent conversion frameworks (both from scratch and via parameter-efficient fine-tuning) under strict consumer hardware constraints.

4. Domain
Artificial Intelligence
► Generative Deep Learning
► Speech Processing (Voice Cloning & Accent Conversion)
► Low-Resource NLP

5. Brief Explanation of the Research
This thesis builds upon the Bangla Parallel Accent Corpus (BPAC) to establish the first direct, textless speech-to-speech baseline for Bangla. Rather than relying on a speech-to-text-to-speech cascade (which destroys natural prosody and timbre), the research evaluates four major generative families for zero-shot voice cloning. Furthermore, it tackles the much harder problem of regional accent conversion—shifting a speaker's regional accent while perfectly preserving their unique voice—by developing a custom adversarial disentanglement model (PPG-FAC) and adapting a pretrained controllable-conversion pipeline (Vevo-style).

6. Experimental & Theoretical Contributions

Voice Cloning Baseline Validation: Evaluated four distinct generative models (GenVC, FreeVC, DiffHierVC, SeedVC). Established SeedVC (a Diffusion-Transformer/DiT architecture) as the optimal framework for Bangla, achieving a target-speaker cosine similarity of 0.9635 and a naturalness Mean Opinion Score (MOS) of 4.25.

Custom Disentanglement Architecture (PPG-FAC): Engineered a frame-synchronous phonetic-posteriorgram synthesizer from scratch. Successfully proved that adversarial training (using a gradient-reversal layer) can mathematically separate regional accent from speaker identity, preventing the network from reconstructing speaker identity from the accent vector.

Parameter-Efficient Accent Conversion: Overcame extreme hardware constraints (4 GB VRAM) by applying Low-Rank Adaptation (LoRA) to a pretrained Vevo-style autoregressive transformer. Achieved high-quality accent transfer with only 2.36 million trainable parameters, outperforming the model's zero-shot baseline (MOS 4.15 vs. 3.85).

Methodological Framework: Created the first matched-sentence evaluation protocol for Bangla, allowing human raters and objective metrics to isolate accent transfer without being confounded by differing vocabulary.

7. Tech Stack & Environment

Voice Cloning Models: SeedVC (DiT), DiffHierVC (Hierarchical Diffusion), FreeVC (Flow/VAE-GAN), GenVC (Autoregressive LM).

Accent Conversion Models: Custom PPG-FAC (Conv1d/LSTM with Adversarial GRL), Vevo-style pipeline (Amphion toolkit).

Feature Extractors & Vocoders: WavLM, ECAPA-TDNN, HuBERT, BigVGAN, HiFi-GAN, Griffin-Lim.

Techniques: LoRA, Gradient-Reversal Layers (GRL), Phonetic Posteriorgrams (PPG), Leave-One-Speaker-Out (LOSO) classification.

Compute: Kaggle Cloud (Dual Tesla T4 16GB) for voice cloning; Local consumer GPU (NVIDIA RTX 3050 4GB) for accent conversion fine-tuning (fp16/mixed precision).
