

1. Exact Title
A Unified Framework for Open-Set Bengali Handwriting Analysis: Writer Verification, Retrieval, Clustering, and Sequential Multi-Writer Segmentation

2. Publication Venue & Status
Submitted to Pattern Analysis and Applications (2026)

3. Your Specific Role
First Author – Conceptualized the unified framework, engineered the custom DPE-Net architecture and the Patch-to-Line-to-Page hierarchical pipeline, curated the multi-writer segmentation dataset, and conducted all SOTA benchmarking and ablation experiments.

4. Links to Artifacts

DOI: 10.1109/ACCESS.2026.DOI

Code & Pre-trained Models: GitHub Repository

Synthesized Multi-Writer Dataset: GitHub Data Folder

5. Domain
Artificial intelligence
► Computer vision
► Machine learning

6. Brief Explanation of the Research
This research introduces a comprehensive deep embedding framework for offline Bengali handwriting analysis, capable of executing writer verification, retrieval, clustering, and sequential multi-writer segmentation on full documents. To isolate true biometric handwriting styles from page layout noise, a novel geometry-aware Patch-to-Line-to-Page hierarchical integration pipeline was developed. By engineering an ultra-lightweight custom CNN (DPE-Net) and adapting a pretrained SOTA model (FasterNet-T0), the system operates entirely under a zero-shot, open-set paradigm, making it highly scalable for real-world forensic and archival processing on resource-constrained edge devices.

7. Theoretical Contributions

Formulated the novel task of open-set Sequential Multi-Writer Segmentation, allowing the system to chronologically track and map multiple unseen authors transitioning within a single continuous document page.

Proved that a geometry-aware Patch-to-Line-to-Page hierarchical aggregation structure fundamentally outperforms standard "flat" (Patch-to-Page) pooling by preserving the spatial sequence of human penmanship.

Engineered the Dual-Path Patch Encoder (DPE-Net), a highly optimized convolutional architecture utilizing parallel standard and dilated branches, designed specifically for extreme computational efficiency at the edge.

8. Experimental Contributions

Page-Level Verification & Retrieval: FasterNet-T0 and DPE-Net achieved 96.00% and 95.00% verification accuracy, respectively, with retrieval Top-1 accuracies peaking at 100.00% and 94.20%.

Unsupervised Clustering: Achieved highly robust writer partitioning with Adjusted Rand Indices (ARI) of 0.9198 (FasterNet-T0) and 0.7865 (DPE-Net).

Sequential Segmentation: FasterNet-T0 attained a 79.38% Absolute Sequence Accuracy, while DPE-Net established a highly stable Sequence Error Rate (SER) of 0.0868.

Demonstrated that the custom DPE-Net requires a mere 707 KB storage footprint and processes full pages in just ~0.51 seconds, vastly outperforming OCR-based and heavier transformer baselines in speed while maintaining high biometric accuracy.

9. Dataset Contribution

Curated a massive 425-writer Bengali handwriting corpus (2,825 pages, 29,268 lines) by manually line-segmenting and building upon the publicly available BN-HTRd and WBSUBNdb_text datasets.

Synthesized and open-sourced a novel 293-page benchmark dataset specifically engineered to evaluate chronological, multi-author page transitions.

10. Tech Stack

Frameworks: Python, PyTorch, CUDA, cuDNN

Architectures: Custom Dual-Path Patch Encoder (DPE-Net), FasterNet-T0, DBSCAN, Agglomerative Hierarchical Clustering

Data Processing: Triplet Margin Loss optimization, L2-normalized Mean Pooling, CLAHE, CRAFT-based scale-normalized detection.
