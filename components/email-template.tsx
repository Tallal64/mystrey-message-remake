interface EmailTemplateProps {
  username: string;
  OTP: string;
}

export function EmailTemplate({ username, OTP }: EmailTemplateProps) {
  return (
    <div>
      <h1>Welcome, {username}!</h1>
      <h3>OTP is {OTP}</h3>
    </div>
  );
}
