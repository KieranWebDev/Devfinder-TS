interface ErrorMessagesProps {
  validUsername: boolean;
  searchQuery: string;
  error: Error | null;
}
interface Error {
  message: string;
  [key: string]: unknown;
}

export default function ErrorMessages({
  validUsername,
  searchQuery,
  error,
}: ErrorMessagesProps) {
  const apiLimitExceeded =
    error !== null && error.message.startsWith('API rate limit exceeded')
      ? true
      : false;
  return (
    <>
      {apiLimitExceeded && (
        <div className="invalid-user-message">
          <h1>
            Sorry, The Api rate limit has been exceeded. Please try again later.
            Only 60 requests per hour are allowed.
          </h1>
        </div>
      )}
      {!apiLimitExceeded && !validUsername && searchQuery !== '' && (
        <div className="invalid-user-message">
          <h1>
            Sorry, we can't find any results for this username. Please check the
            spelling and try again.
          </h1>
        </div>
      )}
      {!apiLimitExceeded && !validUsername && searchQuery === '' && (
        <div className="invalid-user-message">
          <h1>You must enter a username to search.</h1>
        </div>
      )}
    </>
  );
}
