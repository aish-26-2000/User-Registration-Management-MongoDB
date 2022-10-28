const cron = require('node-cron');
const sendEmail = require('../../utils/email');
const service = require('./report.service');

//count
const inviteCount = service.inviteCount();
const userCount = service.userCount();
const regUserCount =  service.regUserCount();
const awaitingUserCount =  service.awaitingUserCount();
const activeUserCount =  service.activeUserCount();


const message = `This is an auto-generated email.\nStandardC User Registration Report \n\nDated On:${new Date()} \n 
                Invite Mails : ${inviteCount} \n
                Users : ${ userCount} \n
                Registered Users : ${ regUserCount } \n
                Awaiting Users : ${ awaitingUserCount } \n
                Active Users : ${ activeUserCount }` 

//send email
exports.autoReport =  async() => {
    cron.schedule('15 * * * * *',async() => {
        await sendEmail({
            from :'no-reply@standardc.com' ,
            to : 'ADMIN <admin@standardc.com>',
            subject : 'StandardC User Details',
            message : message,
        }); 
    });  
};
