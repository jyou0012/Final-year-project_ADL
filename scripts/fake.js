const { MongoClient } = require('mongodb');
const { faker } = require('@faker-js/faker');

const client = new MongoClient("mongodb://127.0.0.1:27017");

const database = client.db("TimesheetDashboard");

const studentCollection = database.collection("student");
const timesheetCollection = database.collection("timesheet");

const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];

const weeks = [
  "Week 1",
  "Week 2",
  "Week 3",
  "Week 4",
  "Week 5",
  "Week 6",
  "Week 7",
  "Week 8",
  "Week 9",
  "Week 10",
  "Week 11",
  "Week 12",
];

// Function to return a random item from an array
function random_item(items) {
    // Use Math.random() to generate a random number between 0 and 1,
    // multiply it by the length of the array, and use Math.floor() to round down to the nearest integer
    return items[Math.floor(Math.random() * items.length)];
}

// Declare and initialize an array of items
var items = [254, 45, 212, 365, 2543];

// Output the result of the random_item function with the array of items
console.log(random_item(items));


async function getAllStudents() {
  console.log(
    await studentCollection
      .aggregate([{ $group: { _id: "$group" } }])
      .toArray(),
  );
  return await studentCollection.find({}).toArray();
}

(async() => {
	const students = await getAllStudents()

	for (let student of students) {
		if (student.group === "6") {
			continue
		
		}
		for (let state of ["draft", "final"]) {
			for (let week of weeks) {
				if (student.id === "a1878349" && (week === "Week 12" || week === "Week 11")) {
					continue
				}
				weekData = {
				  week: week,
				  state: state,
				  student: student.id,
				  group: student.group,
				  createdTime: 1717670831760,
				  updatedTime: 1717670831760,
				  weeklyTotalHours: random_item(["6.7", "3.2", "4.0", "5.0", "4.4", "1.5", "2.5", "3.5", "4.5", "6.5", "5.5", "6.0", "2.2"])
				}
				var d;
				for (let day of days) {
					if (day === "Mon") {
						d = "26/02/2024"
					} else if (day === "Tue") {
						d = "27/02/2024"
					} else if (day === "Wed") {
						d = "28/02/2024"
					} else if (day === "Thu") {
						d = "29/02/2024"
					} else if (day === "Fri") {
						d = "30/02/2024"
					}
					weekData[day] = {
    						date: d,
    						start: random_item(["10:10", "11:20", "12:30", "9:40", "8:00"]),
						end: random_item(["14:30", "15:00", "16:00", "14:20", "15:30"]),
						task: faker.lorem.sentence({ min: 30, max: 50 }),
						fit: faker.lorem.sentence({min:30, max:50}),
						outcome: faker.lorem.sentence({min:30, max:50}),
						totalHours: random_item(["1.2", "2", "1.5", "2.1", "1.7", "3.2", "1.0", "0.5"]),
  					}

				}
				console.log(weekData);
		  	 	await timesheetCollection.updateOne(
				{ student: student, week: week, state: state },
				{
				  $set: weekData
			    },
			    { upsert: true },
			    );

			}
		}
	}
	console.log("end")

/*
	students.map((student) => {
	  await timesheetCollection.updateOne(
    { student: student, week: week, state: state },
    {
      $set: {
        week: week,
        state: state,
        student: student,
        group: group,
        weeklyTotalHours: weeklyTotalHours,
        createdTime: now,
        updatedTime: now,
        ...weekFields,
      },
    },
    { upsert: true },
  );

	})
*/
})();

/*
console.log(faker.string.uuid())



dbTimesheetUpsert({
    student: student.id,
    group: student.group,
    week: formData.get(inputFields["week"]),
    state: formData.get(inputFields["state"]),
    weeklyTotalHours:
      parseFloat(formData.get(inputFields["weeklyTotalHours"])) || null,
    weekFields: Object.fromEntries(
      weekdays.map((day) => [
        day,
        new DayFields({
          date: formData.get(inputFields[day]["date"]) || null,
          start: formData.get(inputFields[day]["start"]) || null,
          end: formData.get(inputFields[day]["end"]) || null,
          task: formData.get(inputFields[day]["task"]) || null,
          fit: formData.get(inputFields[day]["fit"]) || null,
          outcome: formData.get(inputFields[day]["outcome"]) || null,
          totalHours:
            parseFloat(formData.get(inputFields[day]["totalHours"])) || null,
        }),
      ]),
    ),
  });

*/
