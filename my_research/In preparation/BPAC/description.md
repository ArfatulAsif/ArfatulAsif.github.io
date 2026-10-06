1. Exact Title
BPAC: How Detectable is Regional Accent in Read Bangla? A Parallel Corpus and its Phonetic Structure

2. Publication Venue & Status
In preparation

3. Your Specific Role
First Author – Conceptualized the study and led the creation of the Bangla Parallel Accent Corpus (BPAC). Developed the custom SUST Kotha Android application for remote data collection. Designed and executed the experimental pipeline, including the Speech-to-Text (STT) benchmarking, neural embedding (WavLM, ECAPA-TDNN) detectability tests using a strict Leave-One-Speaker-Out (LOSO) protocol, and the classical acoustic-phonetic feature extraction and mapping.

4. Links to Artifacts

DOI: 10.1109/ACCESS.2024.0429000

Corpus: Hugging Face Hub (HF BPAC)


5. Domain
Artificial intelligence
► Natural language processing
► Machine learning

6. Brief Explanation of the Research
This research introduces BPAC, the first fully parallel, 8-region acoustic speech corpus for Bangla, explicitly designed to decouple regional accents from lexical variation. By having 51 speakers read an identical script, the study quantifies regional accent severity through Speech-to-Text degradation and self-supervised neural embeddings. The research ultimately shifts Bangla dialectology from subjective transcription to objective acoustic mathematics, challenging century-old hypotheses about Bengali consonant shifts and revealing that segmental duration, rather than spectral quality, primarily drives regional accent differentiation.

7. Theoretical Contributions

Provided the first quantitative, mathematically verified acoustic baseline for Bangla regional accents, solving the historical problem of dialectology relying entirely on subjective human transcription.

Proved that self-supervised neural speech embeddings (WavLM) can predict regional accents on unseen speakers at rates significantly above chance, establishing the existence of a generalized linguistic accent signal separate from mere speaker identity memorization.

Acoustically refuted the widely cited "palatal-to-alveolar sibilant shift" hypothesis in Bangla, demonstrating mathematically that the regions popularly claimed to exhibit this shift actually deviate in the opposite spectral direction.

8. Experimental Contributions

Benchmarked regional accent severity using two independent STT architectures (wav2vec2 and Whisper), demonstrating that the most divergent region (Sylhet) yielded a Character Error Rate (CER) of 0.0931, compared to 0.0675 for the least divergent (Mymensingh).

Achieved an accent classification lift of 2.19× above chance (p = 0.0099) on unseen speakers within the acoustically controlled laboratory subset using a strict Leave-One-Speaker-Out (LOSO) protocol and speaker-level permutation testing.

Extracted and analyzed high-resolution classical acoustic measurements across 51,059 sibilant tokens and over 200,000 vowel tokens, mapping vowel space geometries via Lobanov normalization and isolating segmental timing as a primary axis of dialectal variation.

9. Dataset Contribution
Created and open-sourced the Bangla Parallel Accent Corpus (BPAC): 27.7 hours of highly controlled, parallel speech data featuring 12,750 utterances from 51 speakers across 8 regions, aligned perfectly to a custom diversity-optimized 250-sentence standard Bangla script.

10. Tech Stack

Frameworks & Tools: Python, PyTorch, Praat, Montreal Forced Aligner (MFA), jiwer (WER/CER).

Architectures & Embeddings: WavLM-Large (content embeddings), ECAPA-TDNN (speaker identity embeddings), wav2vec2-xls-r-300m, Whisper-medium, Linear Discriminant Analysis (LDA).

Data Processing: Leave-One-Speaker-Out (LOSO) cross-validation, WADA-style SNR estimation, Lobanov normalization, PCA, Ward linkage clustering, Mantel testing.
