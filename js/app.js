/* =========================================================
   LawYaar - Main JavaScript
   ========================================================= */


/* =========================================================
   1. PAGE READY
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    initFAQ();
    initQuiz();
    initRightsFilter();
    initGlobalSearch();
    initRightDetail();
    initKeyboardShortcuts();

});


/* =========================================================
   2. FAQ ACCORDION
   ========================================================= */

function initFAQ() {

    const faqQuestions = document.querySelectorAll(".faq-question");

    if (!faqQuestions.length) return;

    faqQuestions.forEach((button) => {

        button.addEventListener("click", () => {

            const faqItem = button.closest(".faq-item");

            if (!faqItem) return;

            const isOpen = faqItem.classList.contains("open");

            // Close all other FAQ items
            document.querySelectorAll(".faq-item").forEach((item) => {
                item.classList.remove("open");

                const answer = item.querySelector(".faq-answer");

                if (answer) {
                    answer.style.maxHeight = null;
                }
            });


            // Open selected item
            if (!isOpen) {

                faqItem.classList.add("open");

                const answer = faqItem.querySelector(".faq-answer");

                if (answer) {
                    answer.style.maxHeight = answer.scrollHeight + "px";
                }

            }

        });

    });

}


/* =========================================================
   3. LEGAL QUIZ
   ========================================================= */

const quizQuestions = [

    {
        question: "Which document contains the Fundamental Rights of Indian citizens?",

        options: [
            "The Constitution of India",
            "A Driving Licence",
            "A Bank Passbook",
            "A School Certificate"
        ],

        answer: 0
    },


    {
        question: "What should you generally do if you face an online financial scam?",

        options: [
            "Ignore it completely",
            "Preserve relevant information and report it through appropriate channels",
            "Delete every message immediately",
            "Share your OTP with the caller"
        ],

        answer: 1
    },


    {
        question: "What is an important step before making a consumer complaint?",

        options: [
            "Throw away the bill",
            "Keep relevant bills, receipts and communication",
            "Delete order information",
            "Ignore the issue"
        ],

        answer: 1
    },


    {
        question: "LawYaar is primarily designed to provide:",

        options: [
            "Court representation",
            "Personal legal advice",
            "General legal awareness and education",
            "Guaranteed legal outcomes"
        ],

        answer: 2
    },


    {
        question: "Where should important legal information be verified?",

        options: [
            "Random social media posts",
            "Official government, court or other authoritative sources",
            "Anonymous comments",
            "Unverified forwarded messages"
        ],

        answer: 1
    }

];


let currentQuestion = 0;
let quizScore = 0;
let quizAnswered = false;


/* Start quiz */

function initQuiz() {

    const questionText = document.getElementById("questionText");

    if (!questionText) return;

    currentQuestion = 0;
    quizScore = 0;
    quizAnswered = false;

    showQuestion();

}


/* Display question */

function showQuestion() {

    const questionText = document.getElementById("questionText");
    const quizOptions = document.getElementById("quizOptions");
    const quizProgress = document.getElementById("quizProgress");
    const quizScoreElement = document.getElementById("quizScore");
    const quizFeedback = document.getElementById("quizFeedback");
    const nextButton = document.getElementById("nextQuestion");
    const resultBox = document.getElementById("quizResult");

    if (!questionText || !quizOptions) return;


    // Result screen
    if (currentQuestion >= quizQuestions.length) {

        showQuizResult();

        return;
    }


    const question = quizQuestions[currentQuestion];

    quizAnswered = false;


    questionText.textContent = question.question;


    if (quizProgress) {
        quizProgress.textContent =
            `Question ${currentQuestion + 1} of ${quizQuestions.length}`;
    }


    if (quizScoreElement) {
        quizScoreElement.textContent =
            `Score: ${quizScore}`;
    }


    if (quizFeedback) {
        quizFeedback.textContent = "";
        quizFeedback.className = "quiz-feedback";
    }


    if (nextButton) {
        nextButton.style.display = "none";
    }


    if (resultBox) {
        resultBox.style.display = "none";
    }


    quizOptions.innerHTML = "";


    question.options.forEach((option, index) => {

        const button = document.createElement("button");

        button.type = "button";

        button.className = "quiz-option";

        button.innerHTML = `
            <span class="option-number">
                ${String.fromCharCode(65 + index)}
            </span>

            <span class="option-text">
                ${escapeHTML(option)}
            </span>
        `;


        button.addEventListener("click", () => {

            selectQuizAnswer(index, button);

        });


        quizOptions.appendChild(button);

    });

}


/* Select answer */

function selectQuizAnswer(selectedIndex, selectedButton) {

    if (quizAnswered) return;

    quizAnswered = true;


    const question = quizQuestions[currentQuestion];

    const allOptions =
        document.querySelectorAll(".quiz-option");

    const feedback =
        document.getElementById("quizFeedback");

    const nextButton =
        document.getElementById("nextQuestion");


    allOptions.forEach((button, index) => {

        button.disabled = true;

        if (index === question.answer) {
            button.classList.add("correct");
        }

    });


    if (selectedIndex === question.answer) {

        quizScore++;

        selectedButton.classList.add("correct");


        if (feedback) {

            feedback.textContent =
                "Correct! Great job.";

            feedback.classList.add("success");

        }

    } else {

        selectedButton.classList.add("wrong");


        if (feedback) {

            feedback.textContent =
                `Not quite. The correct answer is "${question.options[question.answer]}".`;

            feedback.classList.add("error");

        }

    }


    const scoreElement =
        document.getElementById("quizScore");

    if (scoreElement) {
        scoreElement.textContent =
            `Score: ${quizScore}`;
    }


    if (nextButton) {
        nextButton.style.display = "inline-flex";
    }

}


/* Next question */

const nextQuestionButton =
    document.getElementById("nextQuestion");

if (nextQuestionButton) {

    nextQuestionButton.addEventListener("click", () => {

        currentQuestion++;

        showQuestion();

    });

}


/* Quiz result */

function showQuizResult() {

    const quizOptions =
        document.getElementById("quizOptions");

    const quizQuestion =
        document.querySelector(".quiz-question");

    const feedback =
        document.getElementById("quizFeedback");

    const nextButton =
        document.getElementById("nextQuestion");

    const resultBox =
        document.getElementById("quizResult");

    const finalScore =
        document.getElementById("finalScore");

    const progress =
        document.getElementById("quizProgress");


    if (quizOptions) {
        quizOptions.style.display = "none";
    }


    if (quizQuestion) {
        quizQuestion.style.display = "none";
    }


    if (feedback) {
        feedback.style.display = "none";
    }


    if (nextButton) {
        nextButton.style.display = "none";
    }


    if (progress) {
        progress.textContent = "Quiz Complete";
    }


    if (resultBox) {
        resultBox.style.display = "block";
    }


    if (finalScore) {

        let message = "";

        if (quizScore === 5) {
            message = "Excellent! You have a strong basic understanding of legal awareness.";
        }
        else if (quizScore >= 3) {
            message = "Good job! Keep exploring LawYaar to improve your awareness.";
        }
        else {
            message = "Keep learning! Explore the Legal Guides and Know Your Rights sections.";
        }


        finalScore.textContent =
            `You scored ${quizScore} out of ${quizQuestions.length}. ${message}`;

    }

}


/* Restart quiz */

const restartQuiz =
    document.getElementById("restartQuiz");

if (restartQuiz) {

    restartQuiz.addEventListener("click", () => {

        currentQuestion = 0;
        quizScore = 0;
        quizAnswered = false;


        const quizOptions =
            document.getElementById("quizOptions");

        const quizQuestion =
            document.querySelector(".quiz-question");

        const feedback =
            document.getElementById("quizFeedback");


        if (quizOptions) {
            quizOptions.style.display = "grid";
        }


        if (quizQuestion) {
            quizQuestion.style.display = "block";
        }


        if (feedback) {
            feedback.style.display = "block";
        }


        showQuestion();

    });

}


/* =========================================================
   4. RIGHTS CATEGORY FILTER
   ========================================================= */

function initRightsFilter() {

    const filterButtons =
        document.querySelectorAll(".filter-btn");

    const cards =
        document.querySelectorAll(".right-card");

    const noResults =
        document.getElementById("noResults");


    if (!filterButtons.length || !cards.length) return;


    filterButtons.forEach((button) => {

        button.addEventListener("click", () => {

            filterButtons.forEach((btn) => {
                btn.classList.remove("active");
            });


            button.classList.add("active");


            const category =
                button.dataset.category || "all";


            let visibleCount = 0;


            cards.forEach((card) => {

                const cardCategory =
                    card.dataset.category;


                if (
                    category === "all" ||
                    cardCategory === category
                ) {

                    card.style.display = "";

                    visibleCount++;

                }
                else {

                    card.style.display = "none";

                }

            });


            if (noResults) {

                noResults.style.display =
                    visibleCount === 0 ? "block" : "none";

            }

        });

    });

}


/* =========================================================
   5. GLOBAL SEARCH
   ========================================================= */

function initGlobalSearch() {

    const searchInput =
        document.getElementById("globalSearch");


    if (!searchInput) return;


    searchInput.addEventListener("input", () => {

        const query =
            searchInput.value
                .toLowerCase()
                .trim();


        const cards =
            document.querySelectorAll(".right-card");


        if (!cards.length) return;


        let visibleCount = 0;


        cards.forEach((card) => {

            const searchableText =
                (
                    card.dataset.search ||
                    card.textContent
                ).toLowerCase();


            if (
                query === "" ||
                searchableText.includes(query)
            ) {

                card.style.display = "";

                visibleCount++;

            }
            else {

                card.style.display = "none";

            }

        });


        const noResults =
            document.getElementById("noResults");


        if (noResults) {

            noResults.style.display =
                visibleCount === 0 ? "block" : "none";

        }


        // Reset category buttons when searching
        if (query !== "") {

            document
                .querySelectorAll(".filter-btn")
                .forEach((btn) => {
                    btn.classList.remove("active");
                });

        }

    });

}


/* =========================================================
   6. RIGHT DETAIL PAGE
   ========================================================= */

const rightDetails = {

    consumer: {

        category: "CONSUMER RIGHTS",

        title: "Consumer Rights",

        subtitle:
            "Understand your basic rights when buying products or using services.",

        icon: "🛒",

        overview:
            "Consumer awareness helps people make informed decisions when purchasing goods or services. Keeping bills, receipts, warranties and relevant communication can be useful when a problem occurs.",

        points: [

            "Keep bills, receipts, invoices and order information safely.",

            "Check product descriptions, prices, warranty and return information.",

            "Keep records of important communication with the seller or service provider.",

            "Use appropriate consumer grievance channels when a dispute cannot be resolved directly."

        ],

        steps: [

            "Collect your purchase documents and relevant communication.",

            "Clearly identify the problem and communicate it to the seller or service provider.",

            "Keep a record of the response you receive.",

            "If necessary, explore the appropriate consumer grievance mechanism."

        ],

        source:
            "https://consumerhelpline.gov.in/"

    },


    cyber: {

        category: "CYBER AWARENESS",

        title: "Digital & Cyber Rights",

        subtitle:
            "Learn basic steps for staying aware and responding to online incidents.",

        icon: "🔐",

        overview:
            "Digital safety is an important part of modern legal awareness. People should be careful with passwords, OTPs, banking information and personal data. If an online incident occurs, preserving evidence can be useful.",

        points: [

            "Never share OTPs, passwords or sensitive banking credentials unnecessarily.",

            "Be cautious of unknown links, messages and calls asking for money or personal information.",

            "Keep screenshots, transaction details and relevant messages when an incident occurs.",

            "Use appropriate official cybercrime reporting channels when required."

        ],

        steps: [

            "Stop further communication or transactions when it is safe to do so.",

            "Preserve screenshots, transaction information and other relevant evidence.",

            "Contact the appropriate bank or service provider if a financial transaction is involved.",

            "Report the incident through an appropriate official reporting channel."

        ],

        source:
            "https://www.cybercrime.gov.in/"

    },


    police: {

        category: "POLICE AWARENESS",

        title: "Police & Complaint Awareness",

        subtitle:
            "Understand general steps for reporting a concern to an appropriate authority.",

        icon: "👮",

        overview:
            "When reporting a concern, providing clear and relevant information can help authorities understand the situation. Depending on the matter, the appropriate authority and procedure may differ.",

        points: [

            "Clearly explain what happened and when it happened.",

            "Keep relevant documents, messages or other supporting information.",

            "Note important dates, names or reference details where appropriate.",

            "Ask for appropriate acknowledgement or reference information when applicable."

        ],

        steps: [

            "Organize the important facts and supporting information.",

            "Identify the appropriate authority for the concern.",

            "Submit or communicate the complaint through the appropriate channel.",

            "Keep copies or reference details of the communication."

        ],

        source:
            "https://www.india.gov.in/"

    },


    workplace: {

        category: "WORKPLACE",

        title: "Workplace Rights",

        subtitle:
            "Build awareness about fairness, safety and responsibilities at work.",

        icon: "💼",

        overview:
            "Workplace rights and responsibilities can depend on the nature of employment and applicable laws. Employees should keep relevant employment documents and understand the policies applicable to their workplace.",

        points: [

            "Keep copies of important employment-related documents.",

            "Understand relevant workplace policies and procedures.",

            "Maintain records of important workplace communication.",

            "Use appropriate internal or statutory grievance mechanisms when necessary."

        ],

        steps: [

            "Review your employment documents and workplace policies.",

            "Document relevant facts and communication.",

            "Raise the concern through the appropriate workplace channel.",

            "Explore applicable external grievance mechanisms when appropriate."

        ],

        source:
            "https://labour.gov.in/"

    },


    fundamental: {

        category: "CONSTITUTION",

        title: "Fundamental Rights",

        subtitle:
            "Get a beginner-friendly introduction to fundamental constitutional rights.",

        icon: "🇮🇳",

        overview:
            "The Constitution of India provides important Fundamental Rights. These rights form an important part of understanding citizenship and constitutional protections.",

        points: [

            "Fundamental Rights are provided under Part III of the Constitution.",

            "They include important protections relating to equality and freedom.",

            "Constitutional rights are subject to the provisions and limitations of the Constitution.",

            "Understanding your constitutional rights helps build legal awareness."

        ],

        steps: [

            "Learn the basic categories of Fundamental Rights.",

            "Read the relevant constitutional provisions from authoritative sources.",

            "Understand that specific legal situations may require professional guidance.",

            "Use official constitutional and government resources for verification."

        ],

        source:
            "https://legislative.gov.in/constitution-of-india/"

    },


    legalaid: {

        category: "LEGAL AID",

        title: "Access to Legal Help",

        subtitle:
            "Understand where citizens can look for appropriate legal assistance.",

        icon: "🤝",

        overview:
            "Some people may need assistance understanding or accessing legal processes. Legal aid and support mechanisms exist through appropriate institutions and authorities.",

        points: [

            "Identify the nature of your legal issue before seeking assistance.",

            "Keep important documents and relevant facts organized.",

            "Check whether you may be eligible for legal aid under applicable rules.",

            "Use official legal services authorities and verified resources."

        ],

        steps: [

            "Collect relevant documents and information.",

            "Identify an appropriate legal assistance organization.",

            "Ask about available assistance and eligibility.",

            "Follow the guidance provided by the appropriate authority."

        ],

        source:
            "https://nalsa.gov.in/"

    },


    "online-shopping": {

        category: "CONSUMER",

        title: "Online Shopping Awareness",

        subtitle:
            "Know what information to keep when facing a problem with an online purchase.",

        icon: "📦",

        overview:
            "Online purchases generate useful records such as invoices, order details, payment records and messages. Keeping these records can help when resolving a dispute.",

        points: [

            "Save the order confirmation and invoice.",

            "Keep screenshots of important product or offer information.",

            "Keep payment and delivery records.",

            "Read the platform's return, refund and grievance policies."

        ],

        steps: [

            "Collect the order and payment details.",

            "Contact the seller or platform through its official support channel.",

            "Keep the complaint reference or response.",

            "If unresolved, explore the appropriate consumer grievance mechanism."

        ],

        source:
            "https://consumerhelpline.gov.in/"

    },


    data: {

        category: "DIGITAL SAFETY",

        title: "Personal Data Awareness",

        subtitle:
            "Understand basic practices for protecting your personal information online.",

        icon: "🛡️",

        overview:
            "Personal information can be valuable and sensitive. Basic digital-security practices can reduce unnecessary exposure of personal information.",

        points: [

            "Use strong and unique passwords.",

            "Enable additional security measures where available.",

            "Avoid sharing sensitive information with unknown people or websites.",

            "Review permissions and privacy settings regularly."

        ],

        steps: [

            "Review the information you share online.",

            "Use strong passwords and additional security features.",

            "Check whether websites and apps are trustworthy before sharing information.",

            "Report suspicious activity through appropriate official channels."

        ],

        source:
            "https://www.meity.gov.in/"

    }

};


/* Initialize detail page */

function initRightDetail() {

    const title =
        document.getElementById("detailTitle");


    if (!title) return;


    const params =
        new URLSearchParams(window.location.search);


    const topic =
        params.get("topic") || "consumer";


    const data =
        rightDetails[topic] ||
        rightDetails.consumer;


    updateDetailPage(data);

}


/* Update detail content */

function updateDetailPage(data) {

    const icon =
        document.getElementById("detailIcon");

    const category =
        document.getElementById("detailCategory");

    const title =
        document.getElementById("detailTitle");

    const subtitle =
        document.getElementById("detailSubtitle");

    const overview =
        document.getElementById("detailOverview");

    const points =
        document.getElementById("detailPoints");

    const steps =
        document.getElementById("detailSteps");

    const sourceLink =
        document.getElementById("sourceLink");


    if (icon) {
        icon.textContent = data.icon;
    }


    if (category) {
        category.textContent = data.category;
    }


    if (title) {
        title.textContent = data.title;
    }


    if (subtitle) {
        subtitle.textContent = data.subtitle;
    }


    if (overview) {
        overview.textContent = data.overview;
    }


    if (points) {

        points.innerHTML = "";

        data.points.forEach((point) => {

            const li =
                document.createElement("div");

            li.className = "point-item";

            li.innerHTML = `
                <span class="point-check">✓</span>
                <span>${escapeHTML(point)}</span>
            `;

            points.appendChild(li);

        });

    }


    if (steps) {

        steps.innerHTML = "";

        data.steps.forEach((step) => {

            const li =
                document.createElement("li");

            li.textContent = step;

            steps.appendChild(li);

        });

    }


    if (sourceLink && data.source) {

        sourceLink.href = data.source;

    }


    // Update browser title

    document.title =
        `${data.title} | LawYaar`;

}


/* =========================================================
   7. KEYBOARD SHORTCUTS
   ========================================================= */

function initKeyboardShortcuts() {

    document.addEventListener("keydown", (event) => {

        // "/" focuses search

        if (
            event.key === "/" &&
            !isTyping(event.target)
        ) {

            event.preventDefault();

            const search =
                document.getElementById("globalSearch");

            if (search) {
                search.focus();
            }

        }

/* =========================================================
   10. HEADER & UI INTERACTIONS
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       DARK / LIGHT MODE
       ========================= */

    const themeToggle = document.getElementById("themeToggle");

    if (themeToggle) {

        const savedTheme = localStorage.getItem("lawyaar-theme");

        if (savedTheme === "dark") {
            document.body.classList.add("dark-mode");
            updateThemeIcon(true);
        }

        themeToggle.addEventListener("click", () => {

            document.body.classList.toggle("dark-mode");

            const isDark =
                document.body.classList.contains("dark-mode");

            localStorage.setItem(
                "lawyaar-theme",
                isDark ? "dark" : "light"
            );

            updateThemeIcon(isDark);
        });
    }


    function updateThemeIcon(isDark) {

        if (!themeToggle) return;

        themeToggle.innerHTML = isDark
            ? '<i data-lucide="sun"></i>'
            : '<i data-lucide="moon"></i>';

        if (window.lucide) {
            lucide.createIcons();
        }
    }


    /* =========================
       MOBILE MENU
       ========================= */

    const mobileMenuBtn =
        document.getElementById("mobileMenuBtn");

    const sidebar =
        document.getElementById("sidebar");

    if (mobileMenuBtn && sidebar) {

        mobileMenuBtn.addEventListener("click", () => {

            sidebar.classList.toggle("mobile-open");

            const isOpen =
                sidebar.classList.contains("mobile-open");

            mobileMenuBtn.setAttribute(
                "aria-expanded",
                isOpen
            );

            mobileMenuBtn.innerHTML = isOpen
                ? '<i data-lucide="x"></i>'
                : '<i data-lucide="menu"></i>';

            if (window.lucide) {
                lucide.createIcons();
            }
        });


        /* Close menu after clicking navigation */

        sidebar
            .querySelectorAll(".nav-item")
            .forEach((link) => {

                link.addEventListener("click", () => {

                    sidebar.classList.remove(
                        "mobile-open"
                    );

                    mobileMenuBtn.innerHTML =
                        '<i data-lucide="menu"></i>';

                    if (window.lucide) {
                        lucide.createIcons();
                    }
                });

            });
    }


    /* =========================
       HERO SEARCH
       ========================= */

    const heroSearch =
        document.getElementById("heroSearch");

    const heroSearchBtn =
        document.getElementById("heroSearchBtn");

    function performHeroSearch() {

        if (!heroSearch) return;

        const query =
            heroSearch.value
                .trim()
                .toLowerCase();

        if (!query) {

            heroSearch.focus();

            return;
        }


        /* Keyword mapping */

        if (
            query.includes("consumer") ||
            query.includes("shopping") ||
            query.includes("refund") ||
            query.includes("product")
        ) {

            window.location.href =
                "right-detail.html?topic=consumer";

            return;
        }


        if (
            query.includes("cyber") ||
            query.includes("scam") ||
            query.includes("fraud") ||
            query.includes("online")
        ) {

            window.location.href =
                "right-detail.html?topic=cyber";

            return;
        }


        if (
            query.includes("police") ||
            query.includes("fir") ||
            query.includes("complaint")
        ) {

            window.location.href =
                "right-detail.html?topic=police";

            return;
        }


        if (
            query.includes("work") ||
            query.includes("employee") ||
            query.includes("workplace")
        ) {

            window.location.href =
                "right-detail.html?topic=workplace";

            return;
        }


        if (
            query.includes("fundamental") ||
            query.includes("constitution") ||
            query.includes("constitutional")
        ) {

            window.location.href =
                "right-detail.html?topic=fundamental";

            return;
        }


        if (
            query.includes("legal aid") ||
            query.includes("lawyer") ||
            query.includes("legal help")
        ) {

            window.location.href =
                "right-detail.html?topic=legalaid";

            return;
        }


        /* If nothing matches */

        window.location.href =
            "rights.html";
    }


    if (heroSearchBtn) {

        heroSearchBtn.addEventListener(
            "click",
            performHeroSearch
        );
    }


    if (heroSearch) {

        heroSearch.addEventListener(
            "keydown",
            (event) => {

                if (event.key === "Enter") {
                    performHeroSearch();
                }

            }
        );
    }


    /* =========================
       LANGUAGE SELECTOR
       ========================= */

    const languageSelector =
        document.querySelector(
            ".language-selector"
        );

    if (languageSelector) {

        languageSelector.addEventListener(
            "click",
            () => {

                alert(
                    "Language selection will be available soon. Currently LawYaar supports English."
                );

            }
        );
    }


    /* =========================
       USER PROFILE
       ========================= */

    const userProfile =
        document.querySelector(".user-profile");

    if (userProfile) {

        userProfile.style.cursor = "pointer";

        userProfile.addEventListener(
            "click",
            () => {

                alert(
                    "You are browsing LawYaar as a Guest User."
                );

            }
        );
    }

});

        // Escape removes search focus

        if (event.key === "Escape") {

            const search =
                document.getElementById("globalSearch");

            if (search) {
                search.blur();
            }

        }

    });

}


/* =========================================================
   8. UTILITY - ESCAPE HTML
   ========================================================= */

function escapeHTML(value) {

    const div =
        document.createElement("div");

    div.textContent =
        value;

    return div.innerHTML;

}


/* =========================================================
   9. UTILITY - CHECK TYPING FIELD
   ========================================================= */

function isTyping(element) {

    if (!element) return false;


    const tag =
        element.tagName.toLowerCase();


    return (
        tag === "input" ||
        tag === "textarea" ||
        tag === "select" ||
        element.isContentEditable
    );

}