import { z } from 'zod';

// TODO: Enable after review
// export const passwordScheme = z.string().min(8, { message: 'Minimum password length 8 characters' });
export const passwordScheme = z
    .string()
    .min(1, { message: 'Minimum password length 1 characters' })
    .refine((value: string) => value.trim().length > 0, { message: 'Password cannot be whitespace only' });

export const validatePassword = (_password: string, _ctx: z.RefinementCtx): void => {
    // TODO: Enable after review
    // const containsUppercase = (ch: string) => /[A-Z]/.test(ch);
    // const containsLowercase = (ch: string) => /[a-z]/.test(ch);
    // // eslint-disable-next-line no-useless-escape
    // const containsSpecialChar = (ch: string) => /[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/.test(ch);
    // let countOfUpperCase = 0;
    // let countOfLowerCase = 0;
    // let countOfNumbers = 0;
    // let countOfSpecialChar = 0;
    //
    // // eslint-disable-next-line no-plusplus
    // for (let i = 0; i < password.length; i++) {
    // 	const ch = password.charAt(i);
    // 	// eslint-disable-next-line no-plusplus,no-restricted-globals
    // 	if (!isNaN(+ch)) countOfNumbers++;
    // 	// eslint-disable-next-line no-plusplus
    // 	else if (containsUppercase(ch)) countOfUpperCase++;
    // 	// eslint-disable-next-line no-plusplus
    // 	else if (containsLowercase(ch)) countOfLowerCase++;
    // 	// eslint-disable-next-line no-plusplus
    // 	else if (containsSpecialChar(ch)) countOfSpecialChar++;
    // }
    //
    // if (countOfLowerCase < 1) {
    // 	ctx.addIssue({
    // 		code: z.ZodIssueCode.custom,
    // 		message: 'Add a lowercase letter',
    // 		path: ['password'],
    // 	});
    // }
    // if (countOfNumbers < 1) {
    // 	ctx.addIssue({
    // 		code: z.ZodIssueCode.custom,
    // 		message: 'Add a number',
    // 		path: ['password'],
    // 	});
    // }
    // if (countOfUpperCase < 1) {
    // 	ctx.addIssue({
    // 		code: z.ZodIssueCode.custom,
    // 		message: 'Add an uppercase letter',
    // 		path: ['password'],
    // 	});
    // }
    // if (countOfSpecialChar < 1) {
    // 	ctx.addIssue({
    // 		code: z.ZodIssueCode.custom,
    // 		message: 'Add a special character #?!@$%^&*-',
    // 		path: ['password'],
    // 	});
    // }
};
