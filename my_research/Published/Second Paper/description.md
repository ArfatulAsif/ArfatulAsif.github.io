1. Exact Title
Investigating the Impact of Fast-Paced Digital Content, Social Media Engagement, and Lifestyle Factors on Attention, Cognitive Load, and Behavioral Impulsivity: A Machine Learning Approach

2. Publication Venue & Status
Published in Brain and Behavior (Wiley), July 2026

3. Your Specific Role
First Author – Led the conceptualization, methodology, and project administration. Designed the custom 55-item questionnaire, implemented the machine learning software pipeline (nested cross-validation, SHAP), conducted the formal analysis, and wrote the original manuscript.

4. Links to Artifacts

Paper Link: Wiley Online Library

DOI: 10.1002/brb3.71651

5. Domain
Artificial intelligence
► Machine learning
Interdisciplinary & Other
► Human-computer interaction

6. Brief Explanation of the Research
This study explores how fast-paced digital content, social media habits, and lifestyle factors predict subclinical cognitive outcomes like inattention, cognitive load, and impulsivity. By analyzing self-reported data from 301 young adults through four machine learning algorithms (KNN, SVR, RF, XGBoost), the research identifies the specific everyday behaviors that trigger cognitive strain. The findings reveal that digital usage habits (like unintended scrolling) primarily drive attention deficits, whereas underlying emotional distress and lifestyle factors are the strongest predictors for cognitive load and behavioral impulsivity.

7. Theoretical Contributions

Integrated multiple psychological frameworks (Capacity Theory of Attention, Cognitive Load Theory, Dual-Process Models) into a cohesive, data-driven machine learning pipeline to explain modern digital engagement.

Demonstrated that complex cognitive and behavioral traits can be robustly modeled using easily accessible, self-reported daily habits rather than relying on controlled lab environments or clinical sensor data.

Proved that problematic digital behavior is often a downstream, maladaptive coping mechanism for preexisting emotional distress (ego depletion) rather than the sole root cause of impulsivity.

8. Experimental Contributions

Achieved strong predictive performance for attention using Random Forest (R2=0.513), cognitive load using Support Vector Regression (R2=0.380), and behavioral impulsivity using XGBoost (R2=0.359).

Implemented a rigorous 5×5 nested cross-validation procedure combined with permutation importance and SHAP (SHapley Additive exPlanations) to ensure unbiased, highly interpretable feature importance rankings.

Empirically quantified feature importance, proving that tech usage habits drive inattention (accounting for up to 60.33% of predictive importance), while lifestyle factors drive impulsivity (up to 62.41%).

9. Dataset Contribution
Created and validated a custom 55-item cross-sectional dataset from 301 participants, mapping specific digital behaviors and lifestyle factors to self-reported attention, cognitive load, and impulsivity metrics.

10. Tech Stack

Frameworks: Python, scikit-learn, SHAP

Algorithms: Random Forest (RF), Extreme Gradient Boosting (XGBoost), Support Vector Regression (SVR), K-Nearest Neighbors (KNN)

Data Processing: 5×5 nested cross-validation, GridSearchCV, ColumnTransformer (StandardScaler, OneHotEncoder), Permutation Importance testing.
