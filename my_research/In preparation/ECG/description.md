
1. Exact Title
Artifact-Aware ECG Representation Learning for Robust Signal Reconstruction

2. Publication Venue & Status
In preparation

3. Your Specific Role
Co-Author (Undergraduate Researcher). I contributed to designing, implementing, and optimizing the multi-stage ECG representation learning framework, including the biophysically-constrained corruption engine, anchored normalization strategy, and the AUREC architecture progression under severe hardware constraints (2 GB VRAM).

4. Links to Artifacts

5. Domain
Artificial intelligence
► Machine learning
Interdisciplinary & Other
► Comp. bio & bioinformatics
► Self-Supervised & Representation Learning

6. Brief Explanation of the Research
Deep learning for automated ECG analysis is highly vulnerable to real-world clinical artifacts like baseline wander, muscle interference, and lead detachment. This research introduces a novel spatio-temporal framework (utilizing Masked Autoencoders and the AUREC Nexus architecture) to learn robust, geometrically invariant representations of 12-lead ECG signals. By simulating biophysically realistic, coupled acquisition failures and using uncertainty-guided representation learning, the model successfully reconstructs pristine cardiac morphology under severe noise, recovering diagnostic utility far better than conventional denoising methods.

7. Theoretical Contributions

Biophysically-Constrained ECG Corruption Engine: Formulated a novel mathematical approach that models ECG noise not as independent additive Gaussian noise, but as dynamic, impedance-driven, spatially correlated multi-lead acquisition failures (e.g., temporary electrode detachment, motion-induced baseline drift).

Anchored Physiological Normalization: Designed a robust preprocessing technique using median and interquartile range (IQR) statistics calculated exclusively from clean signals. This stabilizes optimization without destroying or suppressing the spatial geometry of the artifacts.

AUREC Nexus Architecture: Engineered a failure-aware physiological encoder that integrates Monte Carlo Epistemic Uncertainty Estimation with Feature-wise Linear Modulation (FiLM) to dynamically adjust latent feature extraction based on the estimated reliability of different signal regions.

8. Experimental Contributions

Bidirectional Artifact Fidelity Framework (BAFF): Created a novel evaluation protocol demonstrating that latent-space learning generalizes significantly better across unseen, cross-domain corruption distributions compared to traditional signal-space training.

State-of-the-Art Validation: The proposed AUREC Nexus (M2) framework drastically outperformed classical DSP (Bandpass), attention-based autoencoders (CBAM-DAE), and diffusion-based denoisers (DeScoD-ECG) on the PTB-XL dataset under severe multi-artifact corruption.

Quantitative Improvements: Achieved a Pearson Correlation Coefficient (PCC) of 0.988, RMSE of 0.230, and SNR of 18.81 dB, while significantly reducing fiducial landmark errors (e.g., QRS localization error reduced to 4.63 ms).

9. Dataset Contribution

Curated and incorporated a locally collected Bangladeshi Clinical ECG Dataset containing approximately 500 clinical 12-lead ECG reports to facilitate external validation and investigate model adaptability to underrepresented regional healthcare settings.


10. Tech Stack

Architectures/Methods: CNNs, Transformers, Masked Autoencoders (MAE), Feature-wise Linear Modulation (FiLM), Monte Carlo (MC) Dropout.

Frameworks/Libraries: Python 3.13.3, PyTorch 2.6.0, CUDA 12.4, cuDNN 9.1.0, SciPy.

Hardware Constraints: Trained entirely on highly constrained local consumer hardware (NVIDIA GeForce MX350, 2 GB VRAM, Intel Core i5) utilizing mixed precision (fp16/AMP), gradient clipping, and strict pipeline optimizations to fit within memory budgets.
