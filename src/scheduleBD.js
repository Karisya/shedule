const fs = require("fs");  
const XLSX = require("xlsx");

const workbook = XLSX.readFile("src/schedule.xlsx");
const sheet = workbook.Sheets[workbook.SheetNames[0]];
const data = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: "" });

let subjects = new Set();
let teachers = new Set();
let specialties = new Set();
let departments = new Set();

const specialtyNames = [
  "РАДИОФИЗИКА И ИНФОРМАЦИОННЫЕ ТЕХНОЛОГИИ",
  "АЭРОКОСМИЧЕСКИЕ РАДИОЭЛЕКТРОННЫЕ И ИНФОРМАЦИОННЫЕ СИСТЕМЫ И ТЕХНОЛОГИИ",
  "КОМПЬЮТЕРНАЯ БЕЗОПАСНОСТЬ",
  "ПРИКЛАДНАЯ ИНФОРМАТИКА"
];

const teacherPattern = /(доц\.|проф\.|ст\. ?пр\.|преп\.|асс\.|лектор)/i;
const departmentPattern = /кафедра/i;
const subgroupPattern = /\d{1,2} п(ар)?\b|подгрупп/i;

data.forEach(row => {
  row.forEach(cell => {
    const raw = String(cell || "").trim();
    if (!raw) return;

    const lines = raw.split(/\n|,/).map(l => l.trim()).filter(Boolean);

    for (let i = 0; i < lines.length; i++) {
      const text = lines[i];

      if (departmentPattern.test(text)) {
        departments.add(text);
        continue;
      }

      specialtyNames.forEach(name => {
        if (text.includes(name)) specialties.add(name);
      });

      if (teacherPattern.test(text)) {
        let clean = text
          .replace(/(доц\.|проф\.|ст\. ?пр\.|преп\.|асс\.|лектор)/gi, "")
          .replace(/\s+/g, " ")
          .trim();
        if (clean.split(" ").length <= 3 && clean.length > 1) teachers.add(clean);

        if (i > 0) {
          const prev = lines[i - 1].trim();
          if (
            prev.length > 1 &&
            !specialtyNames.includes(prev) &&
            !departmentPattern.test(prev) &&
            !teacherPattern.test(prev)
          ) {
            subjects.add(prev);
          }
        }
      }

      if (subgroupPattern.test(text) && i > 0) {
        const prev = lines[i - 1].trim();
        if (
          prev.length > 1 &&
          !specialtyNames.includes(prev) &&
          !departmentPattern.test(prev) &&
          !teacherPattern.test(prev)
        ) {
          subjects.add(prev);
        }
      }
    }
  });
});

function isValidSubject(str) {
  str = str.trim();
  if (!str) return false;
  if (str.length < 2) return false;
  if (teachers.has(str)) return false;
  if (specialties.has(str)) return false;
  if (departmentPattern.test(str)) return false;

  const ignore = [
    /\d/,          
    /лаб/i, /ЛК/i, 
    /\bч\b/i,    
    /С\/К/i, /С\\К/i, 
    /чет/i, /нечет/i,
    /понедельник/i, /вторник/i, /среда/i, /четверг/i, /пятница/i, /суббота/i,
    /задачи/i, /время занятий/i, /ст\. ?пр/i, /ст\. ?преп/i, /еженедельно/i,
    /с октября/i, /с ноября/i, /спутниковой/i, /навиг/i, /\bпг\b/i, /\bгр\b/i, /\br\b/i,
    /инф час/i, /отрасли/i 
  ];

  return !ignore.some(rx => rx.test(str));
}


const cleanSubjects = Array.from(subjects).filter(isValidSubject).sort();

const result = {
  subjects: cleanSubjects,
  teachers: Array.from(teachers).sort(),
  specialties: Array.from(specialties).sort(),
  departments: Array.from(departments).sort(),
};
fs.writeFileSync("src/schedule_clean_data.json", JSON.stringify(result, null, 2), "utf8");

console.log("Успешно создан JSON:");
console.log(`Предметов: ${result.subjects.length}`);
console.log(`Преподавателей: ${result.teachers.length}`);
console.log(`Специальностей: ${result.specialties.length}`);
console.log(`Кафедр: ${result.departments.length}`);
