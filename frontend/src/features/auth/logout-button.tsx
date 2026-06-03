import { Button } from "#/components/ui/button";
import { authClient } from "#/lib/auth-client";
import { useNavigate } from "@tanstack/react-router";

export default function LogoutButton() {
  const navigate = useNavigate();
  const logout = async () => {
    await authClient.signOut();
    navigate({ to: "/auth/login" });
  };
  return <Button onClick={logout}>Logout</Button>;
}
