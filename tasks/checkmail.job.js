const cron = require("node-cron");
const { setTimeout } = require("timers/promises");
const fetchService = require("../services/fetch.service");

const data = require("../list.json");

const scheduleJobs = () => {
    cron.schedule(
        "*/15 * * * *",
        async () => {
            console.log("===============", new Date());
            await data.list.forEach(async (email) => {
                await fetchService.getEmail(email);
                await setTimeout(5000);
            });
        },
        {
            scheduled: true,
        }
    );
};

module.exports = {
    scheduleJobs,
};
