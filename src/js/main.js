$(()=>{
  $(".portfolio-toggle").click((event)=>{
  	const $button = $(event.target);

    $button.toggleClass("active");
    console.log($button.hasClass("active") ? $button.text("see less") : $button.text("see more"));
    $(".more-portfolio").slideToggle("fast");
  })
});