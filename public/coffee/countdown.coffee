$(document).ready () ->
  $(countNum: 0).animate { countNum: 999 },
    duration: 1500
    step: ->
      $(".title_header").attr('data-num', 999 - Math.floor this.countNum)
      return
    complete: ->
      if $(".title_header").attr('data-num') != 0
        $(".title_header").attr 'data-num', 0
      $(".title_header").addClass 'hide'  
      setTimeout ->
        $(".title_header").attr 'data-num', "😎"
        $(".title_header").removeClass 'hide'
      , 400           
      return
  return

