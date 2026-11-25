
const Logincard = ({ children }) => {
  return (
    <div className="group relative mx-auto w-full max-w-md">

      {/* Ambient champagne-gold glow */}
      <div
        className="
          absolute -inset-4 rounded-[2rem]
          bg-gradient-to-br
          from-[#D6B66F]/25
          via-[#C69A45]/10
          to-[#B98532]/25
          opacity-25 blur-2xl
          transition-all duration-700
          group-hover:opacity-90
          group-hover:blur-3xl
        "
      />

      {/* Subtle gold border glow */}
      <div
        className="
          absolute -inset-[1px] rounded-[1.6rem]
          bg-gradient-to-br
          from-[#E8C77A]/40
          via-white/10
          to-[#B98532]/40
          opacity-60
          transition-all duration-500
          group-hover:opacity-100
        "
      />

      {/* Main transparent card */}
      <div
        className="
          relative overflow-hidden
          rounded-[1.6rem]
          border border-white/15
          bg-[#080B12]/55
          px-7 py-9
          shadow-2xl shadow-black/40
          backdrop-blur-[3px]
          transition-all duration-500
          group-hover:-translate-y-1
          group-hover:border-[#D6B66F]/45
          group-hover:shadow-[0_0_40px_rgba(214,166,79,0.18)]
          sm:px-10 sm:py-11
        "
      >

        {/* Internal ambient light */}
        <div
          className="
            pointer-events-none
            absolute -right-20 -top-20
            h-52 w-52 rounded-full
            bg-[#D6B66F]/5
            blur-3xl
            transition-all duration-700
            group-hover:bg-[#D6B66F]/10
          "
        />

        {/* Bottom subtle lighting */}
        <div
          className="
            pointer-events-none
            absolute -bottom-24 -left-20
            h-48 w-48 rounded-full
            bg-[#C69A45]/5
            blur-3xl
          "
        />

        {/* ORBITX branding */}
        <div className="relative z-10 mb-10 text-center">

          <div className="mb-3 flex justify-center">
            <div
              className="
                h-[2px] w-20 rounded-full
                bg-gradient-to-r
                from-transparent
                via-[#E8C77A]
                to-transparent
              "
            />
          </div>

          <h1
            className="
              text-3xl font-light
              tracking-[0.38em]
              text-white
            "
          >
            ORBIT
            <span className="font-semibold text-[#D6B66F]">
              X
            </span>
          </h1>

        </div>

        {/* Login form content */}
        <div className="relative z-10">
          {children}
        </div>

      </div>
    </div>
  );
};

export default Logincard;
