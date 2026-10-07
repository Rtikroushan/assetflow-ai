import {
  Wrench,
  AlertTriangle,
  Calendar,
  CheckCircle,
} from "lucide-react";

export default function Maintenance() {

  const cards = [
    {
      title: "Open Issues",
      value: "18",
      icon: AlertTriangle,
    },
    {
      title: "Scheduled",
      value: "32",
      icon: Calendar,
    },
    {
      title: "Technician Tasks",
      value: "14",
      icon: Wrench,
    },
    {
      title: "Resolved",
      value: "126",
      icon: CheckCircle,
    },
  ];

  return (
    <div className="space-y-6">

      <div>

        <h1 className="text-3xl font-bold">
          Maintenance
        </h1>

        <p className="text-slate-500 mt-1">
          Track maintenance activities and asset health.
        </p>

      </div>

      <div className="
        grid
        grid-cols-1
        sm:grid-cols-2
        xl:grid-cols-4
        gap-5
      ">

        {cards.map((card) => {

          const Icon = card.icon;

          return (

            <div
              key={card.title}
              className="
                card-3d
                rounded-2xl
                border
                bg-white
                p-5
                shadow-sm
              "
            >

              <div className="
                flex
                justify-between
                items-center
              ">

                <div>

                  <p className="text-sm text-slate-500">
                    {card.title}
                  </p>

                  <h2 className="
                    mt-2
                    text-3xl
                    font-bold
                  ">
                    {card.value}
                  </h2>

                </div>

                <div className="
                  rounded-xl
                  bg-blue-50
                  p-3
                  text-blue-600
                ">

                  <Icon size={22} />

                </div>

              </div>

            </div>

          );

        })}

      </div>

    </div>
  );
}