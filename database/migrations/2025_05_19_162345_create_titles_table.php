<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('titles', function (Blueprint $table) {
            $table->integer('emp_no');
            $table->string('title', 50);
            $table->date('from_date');
            $table->date('to_date')->nullable();

            $table->primary(['emp_no', 'title', 'from_date']);

            $table->foreign('emp_no')
                ->references('emp_no')
                ->on('employees')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('titles');
    }
};
