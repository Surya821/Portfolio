import { assets } from '../assets.js';

export const projects = [
  {
    id: "farmlens",
    title: "FARMLENS",
    description: "AI-Powered Ecosystem for Cattle Health",
    imgUrl: assets.Farmlens5,
    fullTitle: "FARMLENS: AI-Powered Cattle Health Ecosystem",
    fullDescription: "FarmLens is a comprehensive AI ecosystem designed for cattle health and farm management. It utilizes a microservices architecture with a Node.js management API and a Python ML inference API. The platform features deep-learning identification of 41+ breeds, skin disease detection (LSD/FMD) via DenseNet121, and a multilingual LLM assistant powered by Groq/Llama-3.",
    technologies: ["React", "Node.js", "Python", "FastAPI", "PyTorch", "TensorFlow", "MongoDB", "Groq (Llama 3)", "Stripe"],
    features: [
      "Deep-Vision Cattle Identification (41+ breeds) using ConvNeXt-Tiny",
      "Comprehensive Diagnostics: Scan for Lumpy Skin and Foot & Mouth diseases",
      "Symptom Analysis: Random Forest mapper for 92 symptoms to 26 diseases",
      "Multilingual AI Chatbot (Groq Llama 3) for medical & management advice",
      "Adaptive Design System for high-glare outdoor farming conditions",
      "Developer API (V1) for breed prediction and symptom diagnosis"
    ],
    images: [
      assets.Farmlens3,
      assets.Farmlens2,
      assets.Farmlens5,
      assets.Farmlens6,
      assets.Farmlens7,
      assets.Farmlens12,
      assets.Farmlens13,
      assets.Farmlens14,
      assets.Farmlens15,
      assets.Farmlens17,
      assets.Farmlens20,
      assets.Farmlens22,
      assets.Farmlens23,
      assets.Farmlens24,
      assets.Farmlens25
    ],
    demoUrl: "https://farmlens.vercel.app",
    githubUrl: "https://github.com/Surya821/farmlens"
  },
  {
    id: "edemy-lms",
    title: "Edemy LMS",
    description: "Full-Stack Learning Management System",
    imgUrl: assets.EdemyHome,
    fullTitle: "Edemy LMS",
    fullDescription: "Edemy is a comprehensive, modern learning management platform built with the MERN stack and integrated with Clerk for secure authentication. It empowers educators to create curriculum and allows students to discovery, enroll, and learn through a premium video player experience.",
    technologies: ["React", "Node.js", "Express", "MongoDB", "Clerk Auth", "Cloudinary", "Tailwind CSS", "Quill.js"],
    features: [
      "Student Portal with course discovery and filtering",
      "Educator Dashboard with powerful analytics and course management",
      "Premium Video Player with chapter navigation",
      "Clerk Authentication with Webhook sync to MongoDB",
      "Rich text editor (Quill.js) for course descriptions",
      "Cloudinary integration for automatic thumbnail uploads"
    ],
    images: [
      assets.EdemyHome,
      assets.EdemyAddCourse,
      assets.EdemyCourse,
      assets.EdemyCourses,
      assets.EdemyManageCourse,
      assets.EdemyTeacher,
      assets.EdemyUsers
    ],
    demoUrl: "https://edemy-woad.vercel.app/",
    githubUrl: "https://github.com/Surya821/Edemy"
  },
  {
    id: "insider-jobs",
    title: "INSIDERJOBS",
    description: "Full-Stack Job Portal Web Application",
    imgUrl: assets.JobHome,
    fullTitle: "INSIDERJOBS",
    fullDescription: "Insiderjobs is a robust full-stack job portal built with the MERN stack. It offers dual roles for Candidates and Recruiters, featuring a complete workflow from job posting and management to resume-based applications and status tracking. The app ensures secure authentication with Clerk (Candidates) and custom JWT (Recruiters).",
    technologies: ["React", "Express", "Node.js", "MongoDB", "Clerk", "Cloudinary", "JWT", "Quill Editor"],
    features: [
      "Candidate Job Search with category & location filtering",
      "Resume (PDF) upload & management via Cloudinary",
      "Application tracking (Pending/Accepted/Rejected status)",
      "Recruiter Dashboard for job posting & management",
      "Company branding with logo uploads",
      "Real-time UI notifications via React Toastify"
    ],
    images: [
      assets.JobHome,
      assets.JobDetails,
      assets.JobAddJob,
      assets.JobAppliedJobs,
      assets.JobCandidateLogin,
      assets.JobCandidateRegister,
      assets.JobManageJobs,
      assets.JobRecruiterLogin,
      assets.JobRecruiterRegister,
      assets.JobViewApplications
    ],
    demoUrl: "https://insider-job-eight.vercel.app/",
    githubUrl: "https://github.com/Surya821/InsiderJob"
  },
  {
    id: "quickchat",
    title: "QuickChat by Surya",
    description: "UI Design & Development",
    imgUrl: assets.chatHome4,
    fullTitle: "QuickChat by Surya",
    fullDescription: "QuickChat is a real-time messaging application built using the MERN stack with Socket.IO for instant communication. It includes secure authentication, profile customization, image uploads via Cloudinary, and a clean responsive UI for seamless chatting.",
    technologies: ["React", "Vite", "TailwindCSS", "Node.js", "Express", "MongoDB", "Socket.IO", "JWT", "Cloudinary"],
    features: [
      "Real-time 1-to-1 private messaging",
      "JWT-based secure authentication",
      "Profile update with image upload",
      "Cloudinary media storage support",
      "Online users indicator",
      "Fully responsive UI (Desktop & Tablet)"
    ],
    images: [assets.chatSignupDesktop, assets.chatLoginDesktop, assets.chatHomeDesktop, assets.chatDesktop, assets.chatProfileDesktop],
    demoUrl: "https://quickchatbysurya.vercel.app",
    githubUrl: "https://github.com/Surya821/Chat-App"
  },
  {
    id: "food-delivery-app",
    title: "Food Delivery App",
    description: "UI Design & Development",
    imgUrl: assets.projImg1,
    fullTitle: "Food Delivery App",
    fullDescription: "A comprehensive food delivery application with intuitive user interface and seamless ordering experience. Built with modern web technologies to provide fast and responsive performance across all devices.",
    technologies: ["React", "Node.js", "MongoDB", "Express"],
    features: [
      "Real-time order tracking",
      "Secure payment integration",
      "Restaurant menu management",
      "User authentication and profiles",
      "Rating and review system"
    ],
    images: [assets.FImg1, assets.FImg2, assets.FImg3],
    demoUrl: "https://food-delivery-app-two-pi.vercel.app/",
    githubUrl: "https://github.com/Surya821/Food-Delivery-App"
  },
  {
    id: "movie-app",
    title: "Movie App",
    description: "Dynamic Movie Finder",
    imgUrl: assets.projImg2,
    fullTitle: "Movie App",
    fullDescription: "An interactive movie discovery platform that allows users to search, browse, and explore movies with detailed information including ratings, cast, and reviews.",
    technologies: ["React", "TMDB API", "CSS3", "React Router"],
    features: [
      "Advanced movie search",
      "Filter by genre and rating",
      "Detailed movie information",
      "Watchlist functionality",
      "Responsive design"
    ],
    images: [assets.MImg1, assets.MImg2, assets.MImg3],
    demoUrl: "https://movie-app-two-cyan-50.vercel.app/",
    githubUrl: "https://github.com/Surya821/Movie-App"
  },
  {
    id: "e-commerce-website",
    title: "E-Commerce-Website",
    description: "React-Powered Online Store",
    imgUrl: assets.projImg3,
    fullTitle: "E-Commerce Website",
    fullDescription: "A full-featured e-commerce platform with shopping cart, product catalog, and secure checkout process. Designed for optimal user experience and conversion rates.",
    technologies: ["React", "Redux", "Node.js", "PostgreSQL", "Stripe"],
    features: [
      "Product catalog with filters",
      "Shopping cart management",
      "Secure payment processing",
      "Order history and tracking",
      "Admin dashboard"
    ],
    images: [assets.EImg1, assets.EImg2, assets.EImg3],
    demoUrl: "https://e-commerce-website-one-psi.vercel.app/",
    githubUrl: "https://github.com/Surya821/E-Commerce-Website"
  },
  {
    id: "music-player",
    title: "Music Player",
    description: "Deezer-Powered Music Player",
    imgUrl: assets.projImg4,
    fullTitle: "Music Player",
    fullDescription: "A modern music streaming application integrated with Deezer API, featuring playlist management, audio controls, and a beautiful user interface.",
    technologies: ["React", "Deezer API", "Web Audio API", "CSS3"],
    features: [
      "Music streaming",
      "Playlist creation",
      "Search functionality",
      "Audio visualization",
      "Favorite tracks management"
    ],
    images: [assets.projImg4],
    demoUrl: "https://surya821.github.io/Music-Player/",
    githubUrl: "https://github.com/Surya821/Music-Player"
  },
  {
    id: "Email-Spam-Classifier",
    title: "Email Spam Classifier",
    description: "Spam email detection using ML",
    imgUrl: assets.Email,
    fullTitle: "Email Spam Classifier",
    fullDescription: "An intelligent email spam detection system built using machine learning techniques. It analyzes email content and classifies messages as 'Spam' or 'Not Spam' based on patterns in the text.",
    technologies: ["Python", "Scikit-learn", "Pandas", "NumPy", "Matplotlib"],
    features: [
      "Text preprocessing and cleaning",
      "Feature extraction using TF-IDF",
      "Spam vs. Ham classification",
      "Model evaluation and accuracy visualization",
      "Interactive user input for testing emails"
    ],
    images: [assets.Email],
    demoUrl: "#",
    githubUrl: "https://github.com/Surya821/Email-Spam-Classifier"
  },
  {
    id: "Face-Feature-Detection",
    title: "Face Feature Detection",
    description: "Facial feature detection using AI",
    imgUrl: assets.Face,
    fullTitle: "Face Feature Detection",
    fullDescription: "A face feature detection system built using computer vision and machine learning techniques. It identifies and marks key facial features such as eyes, nose, and mouth in images or real-time video.",
    technologies: ["Python", "OpenCV", "NumPy", "Matplotlib", "Dlib"],
    features: [
      "Real-time face and feature detection",
      "Detection of eyes, nose, and mouth",
      "Image and webcam input support",
      "Visualization of facial landmarks",
      "Efficient and accurate detection using OpenCV"
    ],
    images: [assets.Face],
    demoUrl: "#",
    githubUrl: "https://github.com/Surya821/Face-Feature-Detection"
  },
  {
    id: "Breast-Cancer-Detection",
    title: "Breast Cancer Detection",
    description: "ML-based cancer prediction model",
    imgUrl: assets.Breast,
    fullTitle: "Breast Cancer Detection",
    fullDescription: "A predictive machine learning project that helps in early detection of breast cancer using diagnostic data. The model analyzes various cellular features to classify tumors as benign or malignant.",
    technologies: ["Python", "Scikit-learn", "Pandas", "NumPy", "Matplotlib", "Seaborn"],
    features: [
      "Data preprocessing and cleaning",
      "Feature selection and visualization",
      "Classification using ML algorithms",
      "Accuracy evaluation and confusion matrix",
      "Prediction for new patient data"
    ],
    images: [assets.Breast],
    demoUrl: "#",
    githubUrl: "https://github.com/Surya821/Breast-Cancer-Detection"
  },    
];
