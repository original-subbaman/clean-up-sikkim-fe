import { Amplify } from "aws-amplify";

let configured = false;

function getRequiredPublicEnv(name: string, value: string | undefined) {
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

export function configureAmplify() {
  if (configured) return;

  Amplify.configure({
    Auth: {
      Cognito: {
        userPoolId: getRequiredPublicEnv(
          "NEXT_PUBLIC_COGNITO_USER_POOL_ID",
          process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID,
        ),
        userPoolClientId: getRequiredPublicEnv(
          "NEXT_PUBLIC_COGNITO_CLIENT_ID",
          process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID,
        ),
        loginWith: {
          email: true,
        },
        signUpVerificationMethod: "code",
        userAttributes: {
          email: { required: true },
        },
        passwordFormat: {
          minLength: 8,
          requireLowercase: true,
          requireUppercase: true,
          requireNumbers: true,
          requireSpecialCharacters: true,
        },
      },
    },
  });

  configured = true;
}

configureAmplify();
