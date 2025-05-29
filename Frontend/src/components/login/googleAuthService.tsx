export async function loginWithGoogleApi(accessToken: string) {
  // Fetch userInfo from Google
  const res = await fetch(
    "https://people.googleapis.com/v1/people/me?personFields=names,emailAddresses,photos,addresses",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  const profile = await res.json();
  const userInfo = {
    email: profile.emailAddresses?.[0]?.value || "",
    name: profile.names?.[0]?.displayName || "",
    picture: profile.photos?.[0]?.url || "",
    given_name: profile.names?.[0]?.givenName || "",
    family_name: profile.names?.[0]?.familyName || "",
  };

  // Send to backend
  const backendRes = await fetch("http://localhost:5231/api/google/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({
      Email: userInfo.email,
      Name: userInfo.name,
      Picture: userInfo.picture,
      GivenName: userInfo.given_name,
      FamilyName: userInfo.family_name,
      Token: accessToken,
    }),
  });

  if (!backendRes.ok) {
    const errorText = await backendRes.text();
    throw new Error(errorText);
  }

  const backendUser = await backendRes.json();
  return { backendUser, accessToken };
}