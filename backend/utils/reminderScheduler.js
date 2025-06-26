const cron = require("node-cron");
const Event = require("../models/events");
const { User } = require("../models/user");
const { sendRegistrationMail } = require("./mailer");

// Schedule the job to run every minute
cron.schedule("* * * * *", async () => {
  // console.log("🕒 Running 5-minute reminder cron...");
  const nowUTC = new Date();

  // Check for events starting in exactly 5 minutes
  const targetTime = new Date(nowUTC.getTime() + 5 * 60000);
  const windowStart = new Date(targetTime.getTime() - 30000); // 30 second buffer before
  const windowEnd = new Date(targetTime.getTime() + 30000); // 30 second buffer after
  // console.log("UTC Start Time:", windowStart.toISOString());
  // console.log("UTC End Time:", windowEnd.toISOString());

  // console.log("IST Start Time:", istStartTime.toISOString());
  // console.log("IST End Time:", istEndTime.toISOString());
  try {
    const events = await Event.find({
      "schedule.startTime": {
        $gte: windowStart,
        $lte: windowEnd,
      },
      reminderSent: false,
    });

    if (events.length === 0) {
      // console.log("📭 No events need reminders right now.");
      return;
    }

    for (const event of events) {
      // Find users registered for this event
      const users = await User.find({
        "learnerProfile.followingContent.registeredEvents": event._id,
      });

      // console.log(
      //   `📅 Event "${event.title}" - sending reminders to ${users.length} users.`
      // );

      for (const user of users) {
        if (user.email) {
          try {
            await sendRegistrationMail(
              user.email,
              event.title,
              "reminder",
              "5 minutes"
            );
            // console.log(`📧 Reminder sent to ${user.email}`);
          } catch (mailErr) {
            console.error(
              `❌ Error sending mail to ${user.email}:`,
              mailErr.message
            );
          }
        }
      }

      // Mark reminder as sent so we don't send duplicate emails
      event.reminderSent = true;
      await event.save();
      // console.log(`✅ Marked "${event.title}" as reminderSent`);
    }
  } catch (error) {
    console.error("❌ Error in 5-minute reminder cron job:", error.message);
  }
});
