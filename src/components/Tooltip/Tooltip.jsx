import cx from 'classnames';
import React from 'react';
import { mergeRefs, useHover, useLayer } from 'react-laag';

import styles from './Tooltip.module.scss';

const EXIT_TIMEOUT = 100;

const DEFAULT_DELAY = 100;

export const Tooltip = ({
  children,
  content,
  overlayClassName,
  visible,
  container,
  placement = 'top-center',
  mouseEnterDelay = DEFAULT_DELAY,
  mouseLeaveDelay = DEFAULT_DELAY,
  autoHide = true,
  autoPlacement = true,
  onTooltipHide,
  overflowContainer = true,
}) => {
  const layerRef = React.useRef(null);
  const [shouldRenderLayer, setShouldRenderLayer] = React.useState(true);
  const [isOver, hoverProps] = useHover({
    delayEnter: mouseEnterDelay,
    delayLeave: mouseLeaveDelay,
  });

  const isOpen = visible ?? isOver;

  const { triggerProps, layerProps, renderLayer } = useLayer({
    auto: autoPlacement,
    container,
    isOpen,
    onDisappear: () => autoHide && setShouldRenderLayer(false),
    overflowContainer,
    placement,
    triggerOffset: 10,
  });

  React.useEffect(() => {
    setShouldRenderLayer(true);

    if (!isOpen) {
      setTimeout(() => {
        onTooltipHide?.();
      }, EXIT_TIMEOUT + 1);
    }
  }, [isOpen]);

  const trigger = React.useMemo(() => (
    React.cloneElement(children, {
      ...triggerProps,
      ...hoverProps,
    })
  ), [children, hoverProps, triggerProps]);

  return (
    <>
      {trigger}
      {shouldRenderLayer && renderLayer(
        <div
          {...layerProps}
          ref={mergeRefs(layerProps.ref, layerRef)}
          onMouseLeave={hoverProps.onMouseLeave}
          className={cx(overlayClassName, styles.tooltipBox)}
        >
          {content}
        </div>
      )}
    </>
  );
};
