type MarkProps = {
  className?: string;
  /** Single-colour version that follows the current text colour. */
  mono?: boolean;
  title?: string;
};

/** The Thapsus mark, redrawn as a vector from the supplied logo. */
export function Mark({ className, mono = false, title }: MarkProps) {
  const labelled = Boolean(title);
  return (
    <svg
      viewBox="0 0 482 460"
      className={className}
      role={labelled ? "img" : undefined}
      aria-hidden={labelled ? undefined : true}
      focusable="false"
    >
      {title ? <title>{title}</title> : null}
      {mono ? (
        <g fill="currentColor">
          <polygon points="0,230 304,0 177,230" opacity=".82" />
          <polygon points="304,0 482,0 177,230" opacity=".55" />
          <polygon points="0,230 177,230 304,460" opacity=".68" />
          <polygon points="177,230 482,460 304,460" />
          <polygon points="271,230 383,157 339,230" opacity=".82" />
          <polygon points="383,157 383,303 339,230" opacity=".55" />
          <polygon points="271,230 339,230 383,303" />
        </g>
      ) : (
        <g>
          <polygon points="0,230 304,0 177,230" fill="#F86F23" />
          <polygon points="304,0 482,0 177,230" fill="#FFB227" />
          <polygon points="0,230 177,230 304,460" fill="#FC9125" />
          <polygon points="177,230 482,460 304,460" fill="#F2421A" />
          <polygon points="271,230 383,157 339,230" fill="#FB7E23" />
          <polygon points="383,157 383,303 339,230" fill="#FFAD25" />
          <polygon points="271,230 339,230 383,303" fill="#F1441A" />
        </g>
      )}
    </svg>
  );
}

type LockupProps = {
  className?: string;
  markClassName?: string;
};

/** Mark + "Thapsus" wordmark. */
export function Lockup({ className = "", markClassName = "h-[22px] w-[23px]" }: LockupProps) {
  return (
    <span className={`inline-flex items-center gap-[0.45em] font-bold tracking-[-0.03em] ${className}`}>
      <Mark className={markClassName} />
      <span>Thapsus</span>
    </span>
  );
}
