Dataset Description
The dataset is a purpose-built, supervised multi-writer corpus of intact, scanned handwritten pages designed specifically to evaluate the joint tasks of writer identification, document segmentation, and page ordering.

Volume & Splits: The dataset contains over 1,700 pages, carefully partitioned into a training set (1,013 pages from 150 documents), a writer-disjoint validation set (367 pages from 16 writers/33 documents), and a held-out test pool (339 pages from 20 unseen writers/52 documents).


Content: Contributors (undergraduate students across multiple departments) wrote on specific academic prompts spanning domains like bioinformatics, computer graphics, data structures, and software engineering.


Strict Formatting Constraints: To isolate biometric and semantic challenges and prevent "cheat cues," participants wrote in dense, continuous blocks of plain prose. They were strictly prohibited from including figures, diagrams, mathematical equations, code, bullet points, section headers, or their own names.


Annotations: Every page is heavily annotated with verified ground-truth labels for writer identity, document identity, and within-document page index (order).


Use Cases
Based on the research presented, this dataset is highly suited for:

Joint Document Restructuring: Acting as a benchmark for end-to-end pipelines that simultaneously solve writer clustering, document grouping, and page sequence reconstruction.


Open-Set Writer Identification: Training and evaluating deep metric learning models (like ArcFace) to cluster handwriting by author, especially for unseen writers.


Handwritten Page Stream Segmentation (PSS): Testing semantic clustering algorithms on continuous handwriting where traditional structural/visual layout cues (like headers or printed formatting) are absent.


Sequence Reconstruction via Discourse: Training sequence models (like Pointer Networks or Cross-Encoders) to reorder intact pages based purely on semantic and discourse continuity, rather than relying on the physical cut-edges/tears used in shredded document reconstruction.


Availability
The data analyzed during this study are available from the me upon reasonable request. (Note: Access is subject to the consent terms under which the handwriting samples were collected and any applicable data-protection requirements governing the contributors’ submissions. Anonymized derivatives can be provided where full release is not permissible).

