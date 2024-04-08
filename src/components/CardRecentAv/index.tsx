import Image from 'next/image';

export type TRecent = {
  id?: number;
  name: string;
  description: string;
  date?: string | Date;
};
const newDate = new Date().toLocaleDateString('pt-BR', { dateStyle: 'short' });

export const CardRecentAv = ({
  id,
  name = 'Anderson',
  description = '',
  date = newDate,
}: TRecent) => {
  return (
    <div
      key={id}
      className="cursor-pointer hover:bg-gray-200 rounded-lg mb-1 p-2 flex flex-wrap justify-between gap-3 "
    >
      <section className="flex justify-between gap-3 ">
        <div className=" h-12 w-12 rounded-full bg-gray-100 p-1">
          <img
            width={200}
            height={200}
            src={`https://api.dicebear.com/7.x/lorelei/svg?seed=${name}`}
            alt="avatar"
          />
        </div>

        <div className="text-sm">
          <p>{name}</p>
          <p className="truncate text-ellipsis overflow-hidden whitespace-nowrap max-sm:w-[100px] w-[60%] text-gray-400">
            {description}
          </p>
        </div>
      </section>
      <p className="text-[10px] italic text-gray-600">{date.toString()}</p>
    </div>
  );
};
