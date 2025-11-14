

export const courses = {
  webDevelpoment: {
    title: "Web Development",
    hausaTitle: "Gina Yanar Gizo",
    description: "Koyon yadda ake gina yanar gizo ta amfani da HTML, CSS da JavaScript",
    thumbnail: "🌐",
    lessons: [
      {
        id: 1,
        title: "Shigar da HTML",
        hausaTitle: "Fara da HTML",
        content: "HTML shi ne kashi na farko na yanar gizo. Yana ba da tsarin shafi na yanar gizo.",
        duration: "30 minutes",
        completed: false,
        multimedia: [
          {
            type: "video",
            url: "https://www.youtube.com/embed/dD2EISBDjWM", // HTML tutorial video
            title: "Video: Yadda ake amfani da HTML",
            description: "Wannan video zai koya muku duk abin da kuke bukata game da HTML"
          },
          {
            type: "image",
            url: "https://via.placeholder.com/600x300/3498db/ffffff?text=HTML+Structure",
            title: "Hoton Tsarin HTML",
            description: "Wannan hoto yana nuna tsarin da HTML ke bi"
          }
        ],
        quiz: {
          title: "Tambayoyin HTML",
          passingScore: 70,
          questions: [
            {
              id: 1,
              question: "Mene ne ma'anar HTML?",
              type: "text",
              options: [
                "Hyper Text Markup Language",
                "High Tech Modern Language", 
                "Hyper Transfer Markup Language",
                "Home Tool Markup Language"
              ],
              correctAnswer: 0
            },
            {
              id: 2,
              question: "Wane tag ne ke nuna shafi na HTML?",
              type: "text",
              options: [
                "<html>",
                "<head>",
                "<body>",
                "<title>"
              ],
              correctAnswer: 0
            },
            {
              id: 3,
              question: "Duba hoton kuma ka ce wane tag ne ke nuna kanun shafi?",
              type: "image",
              imageUrl: "https://via.placeholder.com/400x200/2ecc71/ffffff?text=HTML+Heading+Example",
              options: [
                "<h1>",
                "<p>",
                "<div>",
                "<span>"
              ],
              correctAnswer: 0
            }
          ]
        }
      },
      {
        id: 2,
        title: "Styling with CSS",
        hausaTitle: "Yin Salo da CSS",
        content: "CSS yana ba da salo ga shafukan yanar gizo. Yana ba da launuka, girman font, da sauran salo.",
        duration: "45 minutes",
        completed: false,
        multimedia: [
          {
            type: "video",
            url: "https://www.youtube.com/embed/1PnVor36_40", // CSS tutorial video
            title: "Video: Koyon CSS",
            description: "Koyo game da yadda ake amfani da CSS don sanya salo ga shafukan yanar gizo"
          }
        ],
        quiz: {
          title: "Tambayoyin CSS",
          passingScore: 70,
          questions: [
            {
              id: 1,
              question: "Mene ne ma'anar CSS?",
              type: "text",
              options: [
                "Cascading Style Sheets",
                "Computer Style System",
                "Creative Style Software",
                "Colorful Style System"
              ],
              correctAnswer: 0
            }
          ]
        }
      }
    ]
  },
  
  python: {
    title: "Python Programming", 
    hausaTitle: "Shirye-shiryen Python",
    description: "Koyon yadda ake shirya software tare da harshen Python",
    thumbnail: "🐍",
    lessons: [
      {
        id: 1,
        title: "Python Basics",
        hausaTitle: "Tushen Python",
        content: "Fara koyo game da mahadi na farko a Python: variables, data types, da basic operations.",
        duration: "40 minutes",
        completed: false,
        multimedia: [
          {
            type: "image",
            url: "https://via.placeholder.com/600x300/e74c3c/ffffff?text=Python+Code+Example",
            title: "Misalin code na Python",
            description: "Wannan hoto yana nuna misalin code na Python"
          },
          {
            type: "video",
            url: "https://www.youtube.com/embed/_uQrJ0TkZlc", // Python tutorial video
            title: "Video: Fara da Python",
            description: "Wannan video zai nuna muku yadda ake fara shirye-shirye da Python"
          }
        ],
        quiz: {
          title: "Tambayoyin Python",
          passingScore: 70,
          questions: [
            {
              id: 1,
              question: "Yaya ake ƙirƙiro variable a Python?",
              type: "text",
              options: [
                "x = 5",
                "variable x = 5", 
                "let x = 5",
                "var x = 5"
              ],
              correctAnswer: 0
            },
            {
              id: 2,
              question: "Duba code din a cikin hoton kuma ka ce me zai buga?",
              type: "image",
              imageUrl: "https://via.placeholder.com/400x200/9b59b6/ffffff?text=print(2+3)",
              options: [
                "5",
                "23",
                "Error",
                "2+3"
              ],
              correctAnswer: 0
            }
          ]
        }
      },
      {
        id: 2,
        title: "Functions in Python",
        hausaTitle: "Ayyuka a Python", 
        content: "Koyon yadda ake amfani da ayyuka (functions) don rage maimaitawa a cikin code.",
        duration: "50 minutes",
        completed: false,
        multimedia: [],
        quiz: null
      }
    ]
  },
  
  mathematics: {
    title: "Mathematics",
    hausaTitle: "Lissafi",
    description: "Koyon lissafi daga tushe har zuwa matakai masu zurfi",
    thumbnail: "📊",
    lessons: [
      {
        id: 1,
        title: "Algebra Basics", 
        hausaTitle: "Tushen Algebra",
        content: "Fara koyo game da algebra da yadda ake amfani da ita don warware matsaloli.",
        duration: "35 minutes",
        completed: false,
        multimedia: [
          {
            type: "video",
            url: "https://www.youtube.com/embed/NybHckSEQBI", // Algebra tutorial video
            title: "Video: Tushen Algebra",
            description: "Koyo game da algebra daga tushe"
          },
          {
            type: "image",
            url: "https://via.placeholder.com/600x300/f39c12/ffffff?text=Algebra+Equation",
            title: "Misalin lissafin algebra",
            description: "Wannan hoto yana nuna misalin lissafin algebra"
          }
        ],
        quiz: {
          title: "Tambayoyin Algebra",
          passingScore: 70,
          questions: [
            {
              id: 1,
              question: "Mene ne x a cikin lissafin 2x + 5 = 15?",
              type: "text",
              options: ["5", "10", "15", "20"],
              correctAnswer: 0
            },
            {
              id: 2,
              question: "Duba hoton lissafin kuma ka ce mene ne amsar?",
              type: "image",
              imageUrl: "https://via.placeholder.com/400x200/27ae60/ffffff?text=3x+2=11",
              options: ["x=3", "x=2", "x=4", "x=5"],
              correctAnswer: 0
            }
          ]
        }
      },
      {
        id: 2,
        title: "Geometry",
        hausaTitle: "Lissafin Siffofi",
        content: "Koyon siffofi da yadda ake lissafta su: perimeter, area, da volume.",
        duration: "55 minutes",
        completed: false,
        multimedia: [],
        quiz: null
      }
    ]
  }
};