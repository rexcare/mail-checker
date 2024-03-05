var axios = require("axios");
const sendEmail = require("../utils/sendEmail");

const getEmail = async (email) => {
    const resp = await axios.get("https://generator.email/inbox1/", {
        headers: {
            Cookie: `embx=${encodeURIComponent([email])};surl=${email.split("@").reverse().join("%2F")}`,
        },
    });
    if (resp.data?.includes("unread") || resp.data?.includes("interview")) {
        sendEmail({
            to: process.env.DESK_MAIL,
            from: process.env.SENDGRID_MAIL,
            subject: `${email}`,
            text: `${email}`,
            html: `<strong>${email}</strong>`,
        });
        return true;
    }
    return false;
};

module.exports = {
    getEmail,
};
