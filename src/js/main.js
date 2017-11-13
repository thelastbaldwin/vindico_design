$(()=>{
  $(".portfolio-toggle").click(function(){
  	const $button = $(this);

    $button.toggleClass("active");
    $button.hasClass("active") ? $button.text("see less") : $button.text("see more");
    $(".more-portfolio").slideToggle("fast");
  });

  $(".copy-toggle").click(function(){
    const $this = $(this);

    $this.prev().slideToggle("fast");
    $this.toggleClass("active");
  })
});