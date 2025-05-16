import pygame
import os
from snake import Snake
from food import Food

class Game:
    def __init__(self):
        # Game settings
        self.width = 800
        self.height = 600
        self.block_size = 20
        self.bg_color = (0, 0, 0)  # Black background
        self.text_color = (255, 255, 255)  # White text
        self.base_speed = 10
        self.level = 1
        self.speed = self.base_speed
        
        # Initialize screen
        self.screen = pygame.display.set_mode((self.width, self.height))
        pygame.display.set_caption("Snake Game")
        
        # Initialize game objects
        self.snake = Snake(self.width, self.height, self.block_size)
        self.food = Food(self.width, self.height, self.block_size)
        
        # Game state
        self.score = 0
        self.high_score = self.load_high_score()
        self.game_over = False
        
        # Load sounds
        self.eat_sound = self.load_sound("eat.wav")
        self.crash_sound = self.load_sound("crash.wav")
        
        # Font for text
        self.font = pygame.font.SysFont(None, 36)
    
    def load_sound(self, filename):
        # Create assets directory if it doesn't exist
        if not os.path.exists("assets"):
            os.makedirs("assets")
            
        # Return None if the file doesn't exist (to avoid errors)
        sound_path = os.path.join("assets", filename)
        if not os.path.exists(sound_path):
            return None
            
        try:
            return pygame.mixer.Sound(sound_path)
        except:
            return None
    
    def load_high_score(self):
        try:
            with open("highscore.txt", "r") as file:
                return int(file.read())
        except:
            return 0
    
    def save_high_score(self):
        with open("highscore.txt", "w") as file:
            file.write(str(self.high_score))
    
    def reset(self):
        self.snake.reset()
        self.food.spawn(self.snake.positions)
        self.score = 0
        self.level = 1
        self.speed = self.base_speed
        self.game_over = False
    
    def update(self):
        if self.game_over:
            return
        
        # Move the snake
        self.snake.move()
        
        # Check for collisions with food
        if self.snake.positions[0] == self.food.position:
            self.snake.grow()
            self.food.spawn(self.snake.positions)
            self.score += 1
            
            # Play eat sound
            if self.eat_sound:
                self.eat_sound.play()
            
            # Level up every 5 points
            if self.score % 5 == 0:
                self.level += 1
                self.speed = self.base_speed + (self.level - 1) * 2
        
        # Check for collisions with walls or self
        if (self.snake.check_collision_with_walls() or 
            self.snake.check_collision_with_self()):
            self.game_over = True
            
            # Play crash sound
            if self.crash_sound:
                self.crash_sound.play()
            
            # Update high score
            if self.score > self.high_score:
                self.high_score = self.score
                self.save_high_score()
    
    def render(self):
        # Fill the background
        self.screen.fill(self.bg_color)
        
        # Draw game objects
        self.snake.draw(self.screen)
        self.food.draw(self.screen)
        
        # Draw score and level
        score_text = self.font.render(f"Score: {self.score}", True, self.text_color)
        high_score_text = self.font.render(f"High Score: {self.high_score}", True, self.text_color)
        level_text = self.font.render(f"Level: {self.level}", True, self.text_color)
        
        self.screen.blit(score_text, (10, 10))
        self.screen.blit(high_score_text, (10, 50))
        self.screen.blit(level_text, (self.width - 150, 10))
        
        # Draw game over screen
        if self.game_over:
            game_over_text = self.font.render("GAME OVER", True, (255, 0, 0))
            restart_text = self.font.render("Press 'R' to Restart", True, self.text_color)
            
            self.screen.blit(game_over_text, (self.width // 2 - 100, self.height // 2 - 50))
            self.screen.blit(restart_text, (self.width // 2 - 120, self.height // 2 + 10))
        
        # Update the display
        pygame.display.flip()