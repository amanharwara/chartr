<style>
  .cp-spinner {
    width: 2.5rem;
    height: 2.5rem;
    display: inline-block;
    box-sizing: border-box;
    position: relative;
    align-self: center;
    margin-top: 2.5rem;
  }
  .cp-round:before {
    border-radius: 50%;
    content: " ";
    width: 2.5rem;
    height: 2.5rem;
    display: inline-block;
    box-sizing: border-box;
    border-top: solid 6px #606060;
    border-right: solid 6px #606060;
    border-bottom: solid 6px #606060;
    border-left: solid 6px #606060;
    position: absolute;
    top: 0;
    left: 0;
  }
  .cp-round:after {
    border-radius: 50%;
    content: " ";
    width: 2.5rem;
    height: 2.5rem;
    display: inline-block;
    box-sizing: border-box;
    border-top: solid 6px #fff;
    border-right: solid 6px transparent;
    border-bottom: solid 6px transparent;
    border-left: solid 6px transparent;
    position: absolute;
    top: 0;
    left: 0;
    animation: cp-round-animate 1s ease-in-out infinite;
  }
  @keyframes cp-round-animate {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>

<div class="cp-spinner cp-round" />
