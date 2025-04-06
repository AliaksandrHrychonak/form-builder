import { ENUM_EMAIL } from '../constants/email.enum.constant';

export const EMAIL_TEMPLATES = {
    [ENUM_EMAIL.CHANGE_PASSWORD]: {
        subject: 'Password Change',
        html: (data: { name: string }) => `
            <h1>Hello, ${data.name}!</h1>
            <p>Your password has been successfully changed.</p>
        `,
        text: (data: { name: string }) =>
            `Hello, ${data.name}! Your password has been successfully changed.`,
    },
    [ENUM_EMAIL.WElCOME]: {
        subject: 'Welcome',
        html: (data: { name: string }) => `
            <h1>Welcome, ${data.name}!</h1>
            <p>Thank you for registering with our service.</p>
        `,
        text: (data: { name: string }) =>
            `Welcome, ${data.name}! Thank you for registering with our service.`,
    },
};
