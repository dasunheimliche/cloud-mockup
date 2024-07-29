function GraphicErrorNotification({
  NotificationTo,
  NotificationTime,
  NotificationMessage,
  NotificationContactInfo,
  NotificationContactType,
}: any) {
  return (
    <article className="basic__graphic__styles  error__notification">
      <span className="graphic__span">{NotificationTime ?? "10:00 AM"}</span>
      <h1 className="error__title position__all_columns">
        {NotificationTo ?? "John Doe"}
      </h1>
      <p className="graphic__span position__all_columns">
        {NotificationMessage ??
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Turpis vitae ultrices in sed. Feugiat metus amet, id sed volutpat enim sed. Cras vel vitae, lectus id. Egestas quam auctor commodo porttitor netus risus enim. Nec mi neque malesuada aenean euismod est lorem."}
      </p>
      <span className="graphic__span position__all_columns">
        {NotificationContactInfo ?? "ejemplo@gmail.com"}
      </span>
    </article>
  );
}

export default GraphicErrorNotification;
