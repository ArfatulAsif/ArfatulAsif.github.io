Dataset Description
The BPAC (Bangla Parallel Accent Corpus) is a multi-rate audio speech dataset designed specifically for regional accent research in the Bangla (Bengali) language.

Parallel Design: Its most defining feature is its strictly parallel structure. 51 native speakers read the exact same phonetically diverse 250-sentence script. This allows region and speaker to vary while the linguistic content remains perfectly fixed, enabling direct, content-controlled comparisons.


Volume: Contains 12,747 valid utterances, totaling approximately 27.7 hours of audio per tier.


Demographics: Features 51 speakers (26 male, 25 female) between the ages of 19 and 25.


Geographic Coverage: Represents 8 regions of Bangladesh: Sylhet, Chattogram, Dhaka, Faridpur, Khulna, Mymensingh, Rajshahi, and Rangpur.


Audio Tiers: Released in two formats:



Working Corpus (data/): 16 kHz, mono, 16-bit PCM WAV, peak-normalized to -1 dBFS (best for general modeling).


Original Corpus (data_original/): Un-normalized, native sample rate recordings (48 kHz stereo for lab recordings; 44.1 kHz mono for app recordings) intended for high-fidelity acoustic measurements.


Recording Pipelines (Confound Warning): Male speakers were recorded in a sound-treated laboratory using studio microphones, while female speakers were recorded via a custom Android app ("SUST Kotha") using unprocessed smartphone microphones. Because of this, gender is perfectly confounded with the recording pipeline.


Use Cases
According to the authors, the dataset is intended for the following applications:

Accent & Dialect Research: Detecting and classifying regional Bangla accents and dialects.


Robust ASR (Automatic Speech Recognition): Training and evaluating ASR systems to be accent-controlled or resilient to regional accents.


Voice/Accent Conversion: Building models that convert one accent to another (highly supported by the dataset since a same-content reference exists for every single utterance).


Acoustic-Phonetic Dialectometry: Conducting deep linguistic analyses such as measuring vowel formants, rhythm, intonation, sibilant realization, and forced-alignment-based duration comparisons (using the high-fidelity data_original/ tier).


General ASR Modeling: Serving as a high-quality acoustic modeling resource for general-purpose Bangla speech-to-text systems.


Availability
Platform: The dataset is publicly hosted and available for download on Hugging Face under the repository ArfatulAsif/BPAC.


URL: https://huggingface.co/datasets/ArfatulAsif/BPAC


DOI: 10.57967/hf/10299


Access Method: It can be easily downloaded via the Hugging Face datasets library using Python (e.g., load_dataset("ArfatulAsif/BPAC")). The total file size is 17.8 GB.


License: It is licensed under CC BY-NC 4.0 (Creative Commons Attribution-NonCommercial 4.0 International). It is completely free to share and adapt for non-commercial research purposes with appropriate attribution. Commercial use requires directly contacting the authors at Shahjalal University of Science and Technology (SUST).


Publication Status: The dataset is currently available ahead of its companion peer-reviewed manuscript (titled "BPAC: How Detectable is Regional Accent in Read Bangla? A Parallel Corpus and its Phonetic Structure"), which is in preparation. Researchers are instructed to cite the dataset directly via the provided BibTeX format until the paper is published.

