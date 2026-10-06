1. Exact Title
AkkhorRekha: Content Independent Writer Verification System for Bangla Handwriting via Deep Metric Learning

2. Publication Venue & Status
Published in the 2025 28th International Conference on Computer and Information Technology (ICCIT), Cox’s Bazar, Bangladesh

3. Your Specific Role
First Author – Led the research; conceptualized and designed the hierarchical patch-to-line-to-page metric learning architecture, implemented the custom compact CNN and triplet-loss Siamese network, built the line segmentation and preprocessing pipelines, and conducted all experiments, ablations, and data scaling evaluations.

4. Links to Artifacts

Paper Link: IEEE Xplore

DOI: 10.1109/ICCIT68739.2025.11491114

5. Domain
Artificial intelligence
► Computer vision
► Machine learning

6. Brief Explanation of the Research
This research introduces AkkhorRekha, a content-independent, open-set writer verification system specifically designed for Bangla handwriting. By employing a hierarchical deep metric learning approach, the pipeline extracts and pools local text patches into robust line and page descriptors without relying on the specific words being written. This allows the system to map handwriting features into a structured metric space, offering a highly scalable and robust solution for forensic analysis, document retrieval, and fraud detection.

7. Theoretical Contributions

Designed a novel hierarchical deep metric learning framework that sequentially maps handwriting features from patch to line to page, effectively capturing content-independent style cues.

Proved that a task-specific compact CNN patch encoder, optimized via a triplet-loss Siamese network, outperforms generic pretrained image models (like EfficientNet) for capturing micro-stroke statistics.

Established a rigorous open-set evaluation protocol for the Bangla script utilizing dynamically calibrated distance thresholds where Precision equals Recall.

8. Experimental Contributions

Achieved 97.0% accuracy (AUC 0.9941) at the page level and 90.10% accuracy (AUC 0.9656) at the line level when scaling the training cohort to 214 writers.

Demonstrated the critical impact of data scaling, showing a sharp performance jump from a 140-writer cohort (85.15% line-level accuracy) to the 214-writer cohort.

Validated cross-dataset generalization by successfully testing the page-level pipeline on the external WBSUBNdb dataset.

9. Dataset Contribution
N/A (Established novel writer-disjoint splits and evaluation protocols on existing BN-HTRd and WBSUBNdb datasets).

10. Tech Stack

Frameworks: PyTorch, CUDA, cuDNN

Architectures: Custom compact CNN (patch encoder), Triplet-loss Siamese Network, Pretrained EfficientNet-B0 (baseline)

Data Processing: EasyOCR (for adaptive line segmentation), custom L2-normalized mean-pooling pipelines.
