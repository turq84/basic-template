import React from 'react';
import { VisuallyHidden } from '@reach/visually-hidden';
import { noop } from 'lodash';

type AriaLiveMessageFunction = (
  message: string,
  politeness?: 'polite' | 'assertive'
) => void;

type LiveMessagesContext = {
  addAriaLiveMessage: AriaLiveMessageFunction;
};

const ariaLiveInitialState: LiveMessagesContext = {
  addAriaLiveMessage: noop,
};

const liveContext =
  React.createContext<LiveMessagesContext>(ariaLiveInitialState);

const ContextProvider = liveContext.Provider;

// Inspired by https://almerosteyn.com/2017/09/aria-live-regions-in-react
export const AriaLiveContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [politeMessages, setPoliteMessages] = React.useState<string[]>([]);
  const [assertiveMessages, setAssertiveMessages] = React.useState<string[]>(
    []
  );

  /** Add aria-live message to appropriately polite queue.
   * The queue holds up to 5 most recent aria-live messages, as it's unlikely that we want
   * to notify the user of any events older than that. */
  const addAriaLiveMessage = React.useCallback(
    (message: string, politeness = 'polite') => {
      if (politeness === 'polite') {
        setPoliteMessages((p) => [
          ...p.slice(Math.max(p.length - 5), 0),
          message,
        ]);
      } else if (politeness === 'assertive') {
        setAssertiveMessages((a) => [
          ...a.slice(Math.max(a.length - 5), 0),
          message,
        ]);
      }
    },
    []
  );

  return (
    <ContextProvider value={{ addAriaLiveMessage }}>
      {children}
      <VisuallyHidden>
        <LiveMessageWrapper politeness='polite'>
          {politeMessages.map((message) => (
            <span key={message}>{message}</span>
          ))}
        </LiveMessageWrapper>
        <LiveMessageWrapper politeness='assertive'>
          {assertiveMessages.map((message) => (
            <span key={message}>{message}</span>
          ))}
        </LiveMessageWrapper>
      </VisuallyHidden>
    </ContextProvider>
  );
};

const LiveMessageWrapper: React.FC<{
  politeness: 'polite' | 'assertive';
  children: React.ReactNode;
}> = ({ politeness, children }) => {
  return (
    <div
      role='log'
      aria-live={politeness}
      aria-relevant='additions'
      aria-atomic='true'
    >
      {children}
    </div>
  );
};

export function useAriaLive() {
  const { addAriaLiveMessage } = React.useContext(liveContext);
  return addAriaLiveMessage;
}
