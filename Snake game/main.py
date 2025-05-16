import pygame
import sys
from game import Game

def main():
    # Initialize pygame
    pygame.init()
    pygame.mixer.init()  # Sound effects
    
    # Create game instance
    game = Game()
    
    # Main game loop
    while True:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                sys.exit()
            
            # Handle key presses
            if event.type == pygame.KEYDOWN:
                if game.game_over and event.key == pygame.K_r:
                    game.reset()
                elif not game.game_over:
                    if event.key in [pygame.K_UP, pygame.K_w] and game.snake.direction != (0, 1):
                        game.snake.change_direction((0, -1))
                    elif event.key in [pygame.K_DOWN, pygame.K_s] and game.snake.direction != (0, -1):
                        game.snake.change_direction((0, 1))
                    elif event.key in [pygame.K_LEFT, pygame.K_a] and game.snake.direction != (1, 0):
                        game.snake.change_direction((-1, 0))
                    elif event.key in [pygame.K_RIGHT, pygame.K_d] and game.snake.direction != (-1, 0):
                        game.snake.change_direction((1, 0))
        
        # Update game state
        game.update()
        
        # Render game
        game.render()
        
        # Cap the frame rate
        pygame.time.Clock().tick(game.speed)

if __name__ == "__main__":
    main()