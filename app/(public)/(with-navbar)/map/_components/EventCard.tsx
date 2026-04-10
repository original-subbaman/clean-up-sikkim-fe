export type EventCardProps = {
  title: string;
  description: string;
  image?: string;
  reportedAt: string;
  distance: string;
};

function EventCard({
  title,
  description,
  image,
  reportedAt,
  distance,
}: EventCardProps) {
  return (
    <div
      className="p-3 bg-surface-container-lowest rounded-2xl w-full min-w-0
    shadow-md hover:shadow-md transition-all cursor-pointer group 
    border border-transparent hover:border-emerald-100 shrink"
    >
      <div className="flex gap-3 w-full min-w-0">
        <div className="h-8 w-8 md:h-16 md:w-16 rounded-lg overflow-hidden shrink-0">
          <img
            alt="Trash site thumbnail"
            className="h-full w-full object-cover"
            src={
              image ||
              "https://lh3.googleusercontent.com/aida-public/AB6AXuDTrUpq2A3cAtaiA7KYFQuoCwxCJwcGptByZuCSwa_b96jYuokG8fpx26GM-4bc1ypuLvdQQOh5yKYQFs0W-5AMkMw_V42go7qHPWbEYu4RHxKzlhbzHzyDMbiCJYBKNp4d2vTtlS2zxgxJSKqbyWRV_4tUAU2qYqvIN1j-_3bR5NAu1Lax5TFAJJKxoQqmiPvjf6EvwAQ4GMw0ylfLp7vq0cJLGHerqdTb8yszKjw-x8Jkjw-g7ytvOkW81vOg7BT7cOI3d8oe4qs"
            }
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-col gap-1 lg:flex-row justify-between items-start mb-1 flex-wrap min-w-0">
            <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
              {reportedAt}
            </span>
            <span className="text-[10px] text-slate-400 font-medium">
              {distance} away
            </span>
          </div>
          <h4 className="text-sm font-bold text-on-surface truncate group-hover:text-emerald-800 transition-colors min-w-0">
            {title}
          </h4>
          <p className="text-[11px] text-on-surface-variant truncate min-w-0">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default EventCard;
