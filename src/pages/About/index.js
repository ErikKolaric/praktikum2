import React from "react";
import team from "../../images/team.jpeg";

const About = () => {
  return (
    <div className="mx-auto p-2">
      <h1 className="title p-2">Beard, Hair and Face Specialists</h1>
      <img className="team rounded" src={team} />
      <p className="title p-1">
        The barber salon was created in 2017 as a result of a long-conceived
        plan. We are located at Molkereistraße 8, 1020 Wien, Austria. It was
        founded by Stef Mike and Mark Held, who are considered the best barbers
        in Europe. We guarantee you quality! The pleasure is ours!
      </p>
      <p className="title p-1">
        If you join this great team, you can contact us by e-mail or by phone.
      </p>
      <p className="title p-1">
        We plan to develop further and expand to more locations in Austria, but
        also in Germany!In addition to Vienna and Graz, see you soon in
        Munich...
      </p>
      <div className="mx-auto text-center">
        <h2 className="p-2">WHERE ARE WE LOCATED?</h2>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5316.756060879297!2d16.3914336935791!3d48.2185949!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x476d07a8305c13b1%3A0xdfc64edaf8f890!2sMoses&#39;Barbershop!5e0!3m2!1shr!2shr!4v1685713150383!5m2!1shr!2shr"
          width="800"
          height="600"
          allowfullscreen=""
          className="rounded-sm my-2 karta"
          loading="lazy"
        ></iframe>
      </div>
      <div className="mx-auto text-center my-3">
        <h2 className="py-3">CONTACT US</h2>
        <p>Telephone: 948372990</p>
        <p>Email : salonreo@gmail.com</p>
        <p>www.salonreo.com</p>
      </div>
    </div>
  );
};

export default About;
