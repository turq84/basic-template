import styled from '@emotion/styled';

/** Text component for displaying text that gets ignored by screen readers */
const AriaHidden = styled.span``;
AriaHidden.defaultProps = { 'aria-hidden': 'true' };

export default AriaHidden;
