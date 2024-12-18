module.exports = {
  /// --------------------------------------------------------------------- ///
  /// Project metadata. Used everywhere within the application.             ///
  /// --------------------------------------------------------------------- ///
  name: "Itera",
  description:
    "Bug tracking, feature requesting and feedback all-in-one manager.",
  icons: {
    icon: "/favicon.svg",
  },
  /// --------------------------------------------------------------------- ///
  /// Production-ready?                                                     ///
  /// This setting only affects the primary color.                          ///
  /// The while-testing color can be changed in the tailwind.config.ts file.///
  /// --------------------------------------------------------------------- ///
  production: false,
  /// --------------------------------------------------------------------- ///
  /// A bunch of links that are shown in the footer.                        ///
  /// If you wish to remove them, set the links to an empty array as        ///
  /// follows: links: []                                                    ///
  /// --------------------------------------------------------------------- ///
  links: [
    { title: "Creator Website", href: "https://razvansauciuc.dev" },
    {
      title: "GitHub Repository",
      href: "https://github.com/sauciucrazvan/itera",
    },
  ],
};
