-- Restrict Realtime channel subscriptions to team members only
ALTER TABLE realtime.messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Team members can receive realtime messages"
ON realtime.messages
FOR SELECT
TO authenticated
USING (public.is_team_member(auth.uid()));