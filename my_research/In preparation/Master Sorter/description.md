



1. Exact Title
Restructuring Unordered Handwritten Document Pools: A Decoupled Biometric–Semantic–Sequential Cascade

2. Publication Venue & Status
In preparation


3. Your Specific Role
First Author / Co-Author. Designed and implemented the fully unsupervised three-stage decoupled cascade (Biometric Sort → Semantic Sort → Sequence Sort), collected and annotated the purpose-built multi-writer handwritten corpus, built the hashed/leakage-controlled evaluation pipeline, and conducted the cross-representation ablation studies.

4. Links to Artifacts

5. Domain

Artificial intelligence



► Computer vision

► Machine learning

► Natural language processing

6. Brief Explanation of the Research
The mass digitization of archival records often yields chaotic, unordered pools of scanned handwritten pages where writer identity, document boundaries, and page order are lost. This research introduces a fully unsupervised, three-stage cascade model that restructures these pools by sequentially grouping pages by biometric style (writer), semantic content (document), and sequential discourse (page order) without closed-set assumptions. By utilizing an oracle-grouping error attribution protocol, the system successfully isolates bottlenecks and demonstrates that handwriting-text-recognition (HTR) quality is the dominant factor in document reconstruction.

7. Theoretical Contributions

Decoupled Cascade Architecture: Introduced a novel three-stage design (Biometric → Semantic → Sequential) that prevents negative transfer between competing biometric and semantic objectives.

Hierarchical Intra-Writer Clustering: Implemented a structural constraint where semantic document clustering occurs strictly within discovered writer clusters, effectively preventing the common failure mode of merging different authors writing on the same topic.

Error-Attribution Protocol: Designed an oracle-grouping mode and a hashed, leakage-proof evaluation pipeline to directly measure sequence error propagation, mathematically quantifying the ordering penalty caused by upstream over-segmentation (cascade).

8. Experimental Contributions

Achieved a writer-clustering Adjusted Rand Index (ARI) of 0.952, an intra-writer document-clustering ARI of 0.569, and an end-to-end page-ordering Kendall’s  of 0.289 (which rises to 0.423 under oracle grouping).

Quantified that exactly 32% relative (cascade=0.134) of end-to-end ordering performance is lost to upstream over-segmentation.

Proved via a cross-representation ablation that HTR transcript quality drastically outweighs encoder architecture for this task, showing that upgrading from a print-oriented OCR to a handwriting-specialized transformer improves segmentation ARI by over 5x (from 0.074 to 0.408).

Demonstrated that visual Domain-Adversarial Neural Networks (DANN) fail to disentangle handwriting style from content on this scale.

9. Dataset Contribution
Created a supervised multi-writer corpus of intact handwritten pages. The dataset was collected under strict formatting constraints (dense, continuous blocks of prose with no figures, bullet points, or headers to remove visual cheat-cues) and is heavily annotated for writer identity, document identity, and exact within-document page order.

10. Tech Stack

Architectures: ResNet-18/34/50, Vision Transformers (ViT-B/16), TrOCR (Vision-Encoder-Decoder for handwriting), Sentence Transformers (all-mpnet-base-v2), Domain-Adversarial Neural Networks (DANN), Pointer Networks (LSTM with bilinear attention).

Algorithms/Losses: HDBSCAN (density-based clustering), Additive Angular-Margin Loss (ArcFace), Batch-hard Triplet Loss.

Frameworks/Hardware: PyTorch 2.8, CUDA 12.8, cuDNN, automatic mixed precision (AMP), trained on a single 4 GB NVIDIA RTX 3050 GPU.

